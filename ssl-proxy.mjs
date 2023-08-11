// Licenced to Angus O'Grady and group members under MIT licence.

// Copyright 2023 Angus O'Grady, John Boyer, Oliver Freeman, Kang Yang Chen
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


// import { execSync } from "child_process";
import { randomBytes } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import httpProxy from "http-proxy";
import forge from "node-forge";
// import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const pki = forge.pki;
const rsa = forge.pki.rsa;
const __dirname = dirname(fileURLToPath(import.meta.url));

function createCertificate({ subject, issuer, extensions, duration, key }) {
  const keypair = rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  const cert = forge.pki.createCertificate();

  cert.publicKey = keypair.publicKey;
  cert.serialNumber = randomBytes(32).toString("hex");
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setDate(cert.validity.notBefore.getDate() + duration);

  cert.setSubject(subject);
  cert.setIssuer(issuer);
  cert.setExtensions(extensions);

  cert.sign(key ?? keypair.privateKey, forge.md.sha256.create());

  return {
    key: keypair.privateKey,
    cert: cert,
  };
}

function createCertificateAuthority() {
  const attributes = [
    {
      name: "commonName",
      value: "Sydney Computing Society",
    },
    {
      name: "countryName",
      value: "AU",
    },
    {
      name: "stateOrProvinceName",
      value: "New South Wales",
    },
    {
      name: "localityName",
      value: "Sydney",
    },
    {
      name: "organizationName",
      value: "Sydney Computing Society",
    },
  ];

  // Required for CA certificates.
  const extensions = [
    {
      name: "basicConstraints",
      cA: true,
      critical: true,
    },
    {
      name: "keyUsage",
      keyCertSign: true,
      critical: true,
    },
  ];

  return createCertificate({
    subject: attributes,
    issuer: attributes,
    extensions: extensions,
    duration: 365,
  });
}

function createTlsCertificate({ authority, key }) {
  const attributes = [
    {
      name: "commonName",
      value: "localhost",
    },
  ];

  const extensions = [
    {
      name: "basicConstraints",
      cA: false,
      critical: true,
    },
    {
      name: "keyUsage",
      digitalSignature: true,
      keyEncipherment: true,
      critical: true,
    },
    {
      name: "extKeyUsage",
      serverAuth: true,
      clientAuth: true,
    },
    {
      name: "subjectAltName",
      altNames: [
        {
          type: 2,
          value: "localhost",
        },
      ],
    },
  ];

  return createCertificate({
    subject: attributes,
    issuer: authority.subject.attributes,
    extensions: extensions,
    duration: 365,
    key: key,
  });
}

function main() {
  if (
    !(
      existsSync(`${__dirname}/.dev_cert/cert.pem`) &&
      existsSync(`${__dirname}/.dev_cert/key.pem`)
    )
  ) {
    const authority = createCertificateAuthority();
    const certificate = createTlsCertificate({
      authority: authority.cert,
      key: authority.key,
    });

    try {
      mkdirSync(`${__dirname}/.dev_cert`);
    } catch {
      // do nothing
    }
    writeFileSync(
      `${__dirname}/.dev_cert/ca.cert.pem`,
      pki.certificateToPem(authority.cert)
    );
    writeFileSync(
      `${__dirname}/.dev_cert/cert.pem`,
      pki.certificateToPem(certificate.cert)
    );
    writeFileSync(
      `${__dirname}/.dev_cert/key.pem`,
      pki.privateKeyToPem(certificate.key)
    );

    console.log(
      "no development certificates were found, created at ./dev_cert\n"
    );

    // switch (os.type()) {
    //   case "Darwin":
    //     execSync(
    //       "security add-trusted-cert -p ssl -r trustRoot -k '${os.homedir()}/Library/Keychains/login.keychain' ./.dev_cert/ca.cert.pem"
    //     );
    //     break;

    //   case "Windows_NT":
    //     execSync("certutil -addstore Root ./.dev_cert/ca.cert.pem");
    //     break;

    //   case "Linux":
    //     console.log(
    //       "please manually add the generated certificate authority at ./.dev_cert/ca.cert.pem to trusted roots, if you are on WSL, execute the following command in windows: \n\tcertutil -addstore Root ./.dev_cert/ca.cert.pem"
    //     );
    // }
  }

  httpProxy
    .createProxyServer({
      target: {
        host: "localhost",
        port: 3000,
      },
      ssl: {
        key: readFileSync(`${__dirname}/.dev_cert/key.pem`, "utf8"),
        cert: readFileSync(`${__dirname}/.dev_cert/cert.pem`, "utf8"),
      },
      ws: true,
    })
    .listen(3001);
  console.log(
    "secure proxy server started on 0.0.0.0:3001, url: https://localhost:3001"
  );
}

main();
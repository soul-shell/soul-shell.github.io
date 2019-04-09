const ROUTE_TABLE = {
  '<default>': '/administrator-hub',
  'feef.0000': '/employee-hub'
};

async function delay(millis) {
  await new Promise((resolve) => setTimeout(resolve, millis));
}

document.addEventListener('DOMContentLoaded', async () => {
  const dcdi = new URLSearchParams(window.location.search).get('dcdi') || '<default>';
  resolveDCDI(dcdi);
});

async function resolveDCDI(dcdi) {
  await log(`DCDI is set to "${dcdi}". Performing target lookup in the local network...`, 0);

  const dest = ROUTE_TABLE[dcdi];
  if (dest) {
    await log('Target found. Establishing a Direct Connect (TM) protocol link...', 1000);
    await log('^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@', 1000);
    await delay(80);
    window.location.href = dest;
    document.body.classList.add('navigated-away');
  }
  else {
    await log('Target not found. Attempting to connect to the default endpoint...', 1000);
    await delay(4000);
    resolveDCDI('<default>');
  }
}

async function log(text, textDelay) {
  if (textDelay > 0)
    await delay(textDelay);

  const log = document.getElementById("log");
  const line = document.createElement("li");
  line.appendChild(document.createTextNode(text));
  log.appendChild(line);
}

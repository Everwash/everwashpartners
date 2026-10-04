document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('everWashForm');
  if (!form) return;

  const identityField = document.getElementById('contact-lead-id');
  const registration = document.getElementById('partial-lead-registration');
  const storageKey = 'everwash.contact.attempt';
  const fieldNames = ['firstName', 'lastName', 'email', 'phone', 'carWashName', 'washType', 'state', 'zipCode'];
  let identity;
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    const newAttempt = saved?.finalAttempt && performance.getEntriesByType('navigation')[0]?.type === 'navigate';
    if (!newAttempt && saved && /^[0-9a-f-]{36}$/i.test(saved.lead_id) && Number.isSafeInteger(saved.revision) && saved.revision >= 0) {
      identity = { lead_id: saved.lead_id, revision: saved.revision, finalAttempt: Boolean(saved.finalAttempt) };
    }
  } catch {}
  if (!identity) identity = { lead_id: crypto.randomUUID(), revision: 0, finalAttempt: false };

  function saveIdentity() {
    identityField.value = identity.lead_id;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(identity));
    } catch {}
  }
  saveIdentity();

  function snapshot() {
    const fields = Object.fromEntries(fieldNames.map(name => [name, form.querySelector(`[name="${name}"]`).value]));
    const parameters = new URLSearchParams(location.search);
    for (const name of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      let stored = '';
      try { stored = localStorage.getItem(name) || ''; } catch {}
      fields[name] = parameters.has(name) ? parameters.get(name) : stored;
    }
    fields.source = 'EverWash Contact';
    fields.landing_page = location.origin + location.pathname;
    fields.referrer = document.referrer ? new URL(document.referrer).origin + new URL(document.referrer).pathname : '';
    return fields;
  }

  let lastCaptured = '';
  let hasInput = false;
  let pending;
  let timer;
  let dirtySince = 0;
  let lastAttempt = -Infinity;
  let inFlight = false;
  let submitting = false;

  function schedule(delay = 1500) {
    clearTimeout(timer);
    if (submitting) return;
    if (!dirtySince) dirtySince = Date.now();
    const due = Math.max(lastAttempt + 5000, Math.min(Date.now() + delay, dirtySince + 10000));
    timer = setTimeout(capture, Math.max(0, due - Date.now()));
  }

  async function capture() {
    if (inFlight || submitting) return;
    const fields = snapshot();
    const key = JSON.stringify(fields);
    dirtySince = 0;
    if (key === lastCaptured) return;
    if (fieldNames.some(name => fields[name].trim())) hasInput = true;
    if (!hasInput) return;
    if (!pending || pending.key !== key) {
      identity.revision++;
      saveIdentity();
      pending = {
        key,
        attempts: 0,
        body: new URLSearchParams({
          'form-name': 'EverWash Partial Lead',
          'partial-bot-field': registration.querySelector('[name="partial-bot-field"]').value,
          lead_id: identity.lead_id,
          revision: String(identity.revision),
          status: 'partial',
          captured_at: new Date().toISOString(),
          ...fields
        }).toString()
      };
    }
    if (pending.attempts >= 3) return;
    const request = pending;
    const attemptId = identity.lead_id;
    request.attempts++;
    inFlight = true;
    lastAttempt = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    let failed = false;
    try {
      const response = await fetch('/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: request.body,
        credentials: 'omit',
        keepalive: true,
        signal: controller.signal
      });
      if (!response.ok) throw new Error('Partial capture failed');
      if (identity.lead_id === attemptId) lastCaptured = request.key;
    } catch {
      failed = true;
    } finally {
      clearTimeout(timeout);
      inFlight = false;
      if (identity.lead_id !== attemptId || JSON.stringify(snapshot()) !== request.key) schedule(0);
      else if (failed && request.attempts < 3) schedule(5000);
    }
  }

  form.addEventListener('input', event => {
    if (fieldNames.includes(event.target.name)) schedule();
  });
  form.addEventListener('change', () => schedule(0));
  form.addEventListener('focusout', () => schedule(0));
  form.addEventListener('submit', event => {
    if (event.defaultPrevented) return;
    submitting = true;
    identity.finalAttempt = true;
    saveIdentity();
    clearTimeout(timer);
  });
  window.addEventListener('pageshow', () => { submitting = false; });

  function flush() {
    clearTimeout(timer);
    if (Date.now() - lastAttempt >= 5000) capture();
    else schedule(0);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
  window.addEventListener('pagehide', flush);

});

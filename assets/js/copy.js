// A Copy button on every code block (the prompts are meant to be pasted).
document.querySelectorAll('.post-body pre').forEach((pre) => {
  const wrap = document.createElement('div');
  wrap.className = 'code-wrap';
  pre.parentNode.insertBefore(wrap, pre);
  wrap.appendChild(pre);
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy';
  btn.textContent = 'Copy';
  btn.addEventListener('click', async () => {
    const code = pre.querySelector('code') || pre;
    try {
      await navigator.clipboard.writeText(code.innerText.replace(/\n$/, ''));
      btn.textContent = 'Copied';
    } catch {
      btn.textContent = 'Select to copy';
    }
    setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
  });
  wrap.appendChild(btn);
});

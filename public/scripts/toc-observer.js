const initTocObserver = () => {
  const navs = Array.from(document.querySelectorAll('[data-toc-active-class]'));
  if (navs.length === 0) {
    return;
  }
  const activeClass = navs[0].getAttribute('data-toc-active-class');
  if (!activeClass) {
    return;
  }
  const entryMap = new Map();
  const entries = [];
  navs.forEach((nav) => {
    const tocLinks = Array.from(nav.querySelectorAll('[data-toc-link]'));
    tocLinks.forEach((link) => {
      const slug = link.getAttribute('data-toc-link');
      if (!slug) {
        return;
      }
      let entry = entryMap.get(slug);
      if (!entry) {
        const heading = document.getElementById(slug);
        if (!heading) {
          return;
        }
        entry = { slug, heading, links: [] };
        entryMap.set(slug, entry);
        entries.push(entry);
      }
      entry.links.push(link);
    });
  });
  if (entries.length === 0) {
    return;
  }

  const clearActive = () => {
    entries.forEach((entry) => entry.links.forEach((link) => link.classList.remove(activeClass)));
  };

  const applyActive = (slug) => {
    const match = entryMap.get(slug);
    if (!match) {
      return;
    }
    clearActive();
    match.links.forEach((link) => link.classList.add(activeClass));
  };

  let manualSlug = null;

  const setManualActive = (slug) => {
    if (!slug) {
      return;
    }
    manualSlug = slug;
    applyActive(slug);
  };

  const resetManual = () => {
      manualSlug = null;
  };

  const updateActiveByViewport = () => {
    const viewportOffset = 80;
    let candidate = null;
    for (const entry of entries) {
      const rectTop = entry.heading.getBoundingClientRect().top;
      if (rectTop - viewportOffset <= 0) {
        candidate = entry;
      } else {
        break;
      }
    }

    if (manualSlug) {
      const manualItem = entryMap.get(manualSlug);
      if (manualItem) {
        const manualTop = manualItem.heading.getBoundingClientRect().top;
        if (
          (candidate && candidate.slug !== manualSlug) ||
          manualTop - viewportOffset <= 0 ||
          manualTop > window.innerHeight - viewportOffset
        ) {
          resetManual();
        } else {
          if (!manualItem.links.some((link) => link.classList.contains(activeClass))) {
            applyActive(manualSlug);
          }
          return;
        }
      } else {
        resetManual();
      }
    }

    if (candidate) {
      if (!candidate.links.some((link) => link.classList.contains(activeClass))) {
        applyActive(candidate.slug);
      }
      return;
    }

    applyActive(entries[0].slug);
  };

  entries.forEach((entry) => {
    entry.heading.addEventListener('click', () => {
      setManualActive(entry.slug);
    });
    entry.links.forEach((link) => {
      link.addEventListener('click', () => {
        setManualActive(entry.slug);
      });
    });
  });

  let scheduled = false;
  const onScroll = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateActiveByViewport();
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  const handleHashChange = () => {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) {
      return;
    }
    const match = linksByHeading.find((item) => item.slug === hash);
    if (match) {
      setManualActive(hash);
    }
  };

  window.addEventListener('hashchange', handleHashChange);

  const initialHash = window.location.hash.replace(/^#/, '');
  if (initialHash && entryMap.has(initialHash)) {
    setManualActive(initialHash);
  } else {
    setManualActive(entries[0].slug);
  }
  updateActiveByViewport();

  window.addEventListener(
    'pagehide',
    () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('hashchange', handleHashChange);
    },
    { once: true }
  );
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTocObserver, { once: true });
} else {
  initTocObserver();
}

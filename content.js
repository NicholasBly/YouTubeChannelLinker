function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function fixChannelLinks() {
  const channelNames = document.querySelectorAll('ytd-channel-name:not([data-fixed])');
  
  channelNames.forEach(channelName => {
    const linkElement = channelName.querySelector('#text');
    if (linkElement && linkElement.textContent) {
      let channelUrl;
      
      // Try to find the accurate channel handle
      const channelRenderer = channelName.closest('ytd-channel-renderer');
      if (channelRenderer) {
        const subscribersElement = channelRenderer.querySelector('#subscribers');
        if (subscribersElement && subscribersElement.textContent.startsWith('@')) {
          channelUrl = `https://www.youtube.com/${subscribersElement.textContent.trim()}`;
        }
      }
      
      // If we couldn't find the accurate handle, fall back to the original method
      if (!channelUrl) {
        const channelHandle = linkElement.textContent.trim().replace(/\s+/g, '');
        channelUrl = `https://www.youtube.com/@${channelHandle}`;
      }
      
      // Create a wrapper element
      const wrapper = document.createElement('a');
      wrapper.href = channelUrl;
      wrapper.style.textDecoration = 'none';
      linkElement.style.color = '#3ea6ff';
      wrapper.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      // Check if the linkElement is already wrapped
      if (linkElement.parentNode.tagName !== 'A') {
        // Wrap the existing element
        linkElement.parentNode.insertBefore(wrapper, linkElement);
        wrapper.appendChild(linkElement);
      }

      // Update styling to indicate it's clickable
      linkElement.style.cursor = 'pointer';

      // Add hover effect
      linkElement.addEventListener('mouseover', () => {
        linkElement.style.textDecoration = 'underline';
      });
      linkElement.addEventListener('mouseout', () => {
        linkElement.style.textDecoration = 'none';
      });

      // Mark this element as fixed
      channelName.setAttribute('data-fixed', 'true');
    }
  });
}

const debouncedFixChannelLinks = debounce(fixChannelLinks, 250);

debouncedFixChannelLinks();

const observer = new MutationObserver((mutations) => {
  let shouldRun = false;
  for (let mutation of mutations) {
    if (mutation.addedNodes.length) {
      shouldRun = true;
      break;
    }
  }
  if (shouldRun) {
    debouncedFixChannelLinks();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

setTimeout(() => observer.disconnect(), 60000);
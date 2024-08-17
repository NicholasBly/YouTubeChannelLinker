// Debounce function to limit how often the main function runs
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
      const channelHandle = linkElement.textContent.trim().replace(/\s+/g, '');
      const channelUrl = `https://www.youtube.com/@${channelHandle}`;
      
      // Create a wrapper element
      const wrapper = document.createElement('a');
      wrapper.href = channelUrl;
      wrapper.style.textDecoration = 'none';
      wrapper.style.color = 'inherit';
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

// Debounced version of fixChannelLinks
const debouncedFixChannelLinks = debounce(fixChannelLinks, 250);

// Run the function initially
debouncedFixChannelLinks();

// Use a MutationObserver to handle dynamically loaded content
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

// Disconnect the observer after 60 seconds to prevent continuous observation
setTimeout(() => observer.disconnect(), 60000);
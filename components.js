function generateComponentHTML(component) {
  let html = '';

  switch (component.type) {
    case 'Title':
      html = `<div class="storyTitle">
                <div class="Square"><img src="/assets/svg/Polygon.svg" alt=""></div>
                <h1 class="Title">${component.text}</h1>
                <div class="Square"><img src="/assets/svg/Polygon.svg" alt=""></div>
              </div>`;
      break;

    case 'Narrative':
      html = `<div class="storyNarrative">
                <div class="Square"><img src="/assets/svg/Rectangle.svg" alt=""></div>
                <p class="Text">${component.text}</p>
              </div>`;
      break;

    case 'Dialogue':
      const side = component.align === 'left' ? 'left' : 'right';
      html = `<div class="storyDialogue-${side}">
                ${side === 'left' ? `<img src="/assets/images/${component.image}.png" alt="">` : ''}
                <p>
                  <span class="Name">${component.name}</span><br>
                  <span class="Text">${component.text}</span>  
                </p>
                ${side === 'right' ? `<img src="/assets/images/${component.image}.png" alt="">` : ''}
              </div>`;
      break;

    case 'Image':
      html = `<img class="storyImage" src="/assets/images/${component.src}.png" alt="${component.alt}">`;
      break;

    case 'Choice':
      html = `<div class="storyChoice">
                <div class="Square"><img src="/assets/svg/Star.svg" alt=""></div>`;
      component.choices.forEach(choice => {
        html += `<button>${choice.text}</button>`;
      });
      html += `</div>`;
      break;

    case 'Spacing':
      html = `<div class="spacingBlock"></div>`;
      break;

    default:
      console.warn('Unknown component type:', component.type);
  }

  return html;
}

// Export the function for use in other files
export { generateComponentHTML };

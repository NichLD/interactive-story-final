let story = [];

function addComponent(type) {
    const component = { type: type };
    switch (type) {
        case 'Title':
            component.title = prompt('Enter title text:');
            break;
        case 'Image':
            component.src = prompt('Enter image source:');
            component.alt = prompt('Enter image alt text:');
            break;
        case 'Narrative':
            component.text = prompt('Enter narrative text:');
            break;
        case 'Dialogue':
            component.align = prompt('Enter dialogue alignment (left/right):');
            component.image = prompt('Enter character image source:');
            component.name = prompt('Enter character name:');
            component.text = prompt('Enter dialogue text:');
            break;
        case 'Choice':
            component.choices = [];
            const choice1 = { text: prompt('Enter choice 1 text:'), next: prompt('Enter choice 1 next step:') };
            const choice2 = { text: prompt('Enter choice 2 text:'), next: prompt('Enter choice 2 next step:') };
            component.choices.push(choice1, choice2);
            break;
    }
    story.push(component);
    updatePreview();
}

function updatePreview() {
    const preview = document.getElementById('preview');
    preview.innerHTML = ''; // Clear current preview
    story.forEach(component => {
        let element;
        switch (component.type) {
            case 'Title':
                element = `<h1>${component.title}</h1>`;
                break;
            case 'Image':
                element = `<img src="${component.src}" alt="${component.alt}" style="max-width:100px;">`;
                break;
            case 'Narrative':
                element = `<p>${component.text}</p>`;
                break;
            case 'Dialogue':
                element = `<div style="text-align:${component.align};"><strong>${component.name}:</strong> ${component.text}</div>`;
                break;
            case 'Choice':
                element = component.choices.map(choice => `<button>${choice.text}</button>`).join('');
                break;
        }
        preview.innerHTML += element;
    });
}

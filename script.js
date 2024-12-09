const lst = document.querySelector('#items')
const form = document.forms.DataForm

async function load_objects() {
    const res = await fetch('https://orozking.pythonanywhere.com/api/v1/news/')
    if (res.ok) {
        const data = await res.json()
        let index = 0
        const delay = 100
        function addCard() {
            if (index < data['results'].length) {
                const item = data['results'][index]
                const card = document.createElement('div')
                card.classList.add('relative', 'group', 'transition-all', 'duration-300')
                card.setAttribute('data-news-id', item.id)

                const imageDiv = document.createElement('div')
                imageDiv.classList.add('relative', 'overflow-hidden', 'rounded-xl', 'shadow-lg')
                const img = document.createElement('img')
                img.setAttribute('src', item.image)
                img.setAttribute('alt', 'Image')
                img.classList.add('w-full', 'h-[280px]', 'object-cover')
                imageDiv.appendChild(img)
                card.appendChild(imageDiv)

                const textDiv = document.createElement('div')
                textDiv.classList.add('absolute', 'bottom-0', 'left-0', 'right-0', 'p-4', 'bg-gradient-to-t', 'from-black/80', 'to-transparent')

                const flexDiv = document.createElement('div')
                flexDiv.classList.add('flex', 'items-center', 'justify-between')

                const title = document.createElement('h3')
                title.classList.add('text-lg', 'font-bold', 'mt-2', 'text-shadow', 'line-clamp-2')
                title.textContent = item.name;
                flexDiv.appendChild(title);

                const buttonsDiv = document.createElement('div')
                buttonsDiv.classList.add('flex', 'gap-2')

                const delButton = document.createElement('button')
                delButton.classList.add('w-full', 'sm:w-auto', 'px-4', 'sm:px-6', 'py-2', 'bg-red-500', 'text-white', 'text-sm', 'sm:text-base', 'font-medium', 'rounded-lg', 'transition-all', 'duration-300', 'hover:bg-red-600', 'hover:shadow-lg', 'hover:shadow-red-300/50', 'active:scale-95', 'focus:outline-none', 'focus:ring-2', 'focus:ring-red-500', 'focus:ring-offset-2')
                delButton.setAttribute('onclick', `delObj(${item.id})`)
                delButton.innerHTML = `<div class="flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                            </svg>
                                        </div>`
                buttonsDiv.appendChild(delButton)

                const getButton = document.createElement('button')
                getButton.classList.add('w-full', 'sm:w-auto', 'px-4', 'sm:px-6', 'py-2', 'bg-purple-500', 'text-white', 'text-sm', 'sm:text-base', 'font-medium', 'rounded-lg', 'transition-all', 'duration-300', 'hover:bg-purple-600', 'hover:shadow-lg', 'hover:shadow-purple-300/50', 'active:scale-95', 'focus:outline-none', 'focus:ring-2', 'focus:ring-purple-500', 'focus:ring-offset-2')
                getButton.setAttribute('onclick', `getDataObj(${item.id})`)
                getButton.innerHTML = `<div class="flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                            </svg>
                                        </div>`
                buttonsDiv.appendChild(getButton)
                flexDiv.appendChild(buttonsDiv)
                textDiv.appendChild(flexDiv)
                card.appendChild(textDiv)

                lst.appendChild(card)

                index++
                setTimeout(addCard, delay)
            }
        }

        addCard()
    } else {
        alert('Ошибка при загрузке данных...')
    }
}


function showDataForm() {
    document.getElementById('data-form').classList.remove('hidden')
    document.getElementById('data-form').classList.add('animate-slide-up')
}

function closeDataForm() {
    document.getElementById('data-form').classList.remove('animate-slide-up')
    document.getElementById('data-form').classList.add('hidden')
    document.querySelector('#submit-btn').textContent = 'Создать'
    document.forms.DataForm.reset()
}

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('create');
    btn.addEventListener('click', () => {
        showDataForm()
    })
})
async function loadSelectOptions(url, select, name) {
    const res = await fetch(url)
    if (res.ok) {
        const data = await res.json()
        for (item of data['results']) {
            const option = document.createElement('option')
            option.value = item.id
            option.innerHTML = item.name
            select.appendChild(option)
        }

    } else {
        alert(`Не удалось получить ${name}`)
    }
}

async function createObj() {

    // const selectedTags = Array.from(createForm.tags.options).filter((option) => option.selected).map(i => +i.value)

    // const body = new FormData()

    // body.append('name', createForm.name.value)
    // body.append('image', createForm.image.files[0])
    // body.append('description', createForm.description.value)
    // body.append('content', createForm.content.value)
    // body.append('category', createForm.category.value)
    // body.append('is_published', String(createForm.name.checked))
    // for (const tag of selectedTags) body.append('tags', tag)

    const body = new FormData(form)
    const res = await fetch('https://orozking.pythonanywhere.com/api/v1/news/', {
        method: 'POST',
        headers: {
            Authorization: 'Token b44d3d3a5b689c7c4f00585bfb3ec66269438e51'
        },
        body,
    })
    if (res.ok) {
        const data = await res.json()
        console.log(`Успешно создан объект с ID ${data.id}`)
        addMessage({ text: `Успешно создан объект с ID ${data.id}`, type: 'success', duration: 5000 });
        closeDataForm()
        form.reset()
        const card = document.createElement('div');
        card.classList.add('relative', 'group', 'transition-all', 'duration-300');
        card.setAttribute('data-news-id', data.id);

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('relative', 'overflow-hidden', 'rounded-xl', 'shadow-lg');
        const img = document.createElement('img');
        img.setAttribute('src', data.image);
        img.setAttribute('alt', 'Image');
        img.classList.add('w-full', 'h-[280px]', 'object-cover');
        imageDiv.appendChild(img);
        card.appendChild(imageDiv);

        const textDiv = document.createElement('div');
        textDiv.classList.add('absolute', 'bottom-0', 'left-0', 'right-0', 'p-4', 'bg-gradient-to-t', 'from-black/80', 'to-transparent');

        const flexDiv = document.createElement('div');
        flexDiv.classList.add('flex', 'items-center', 'justify-between');

        const title = document.createElement('h3');
        title.classList.add('text-lg', 'font-bold', 'mt-2', 'text-shadow', 'line-clamp-2');
        title.textContent = data.name;
        flexDiv.appendChild(title);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('flex', 'gap-2');

        const delButton = document.createElement('button');
        delButton.classList.add('w-full', 'sm:w-auto', 'px-4', 'sm:px-6', 'py-2', 'bg-red-500', 'text-white', 'text-sm', 'sm:text-base', 'font-medium', 'rounded-lg', 'transition-all', 'duration-300', 'hover:bg-red-600', 'hover:shadow-lg', 'hover:shadow-red-300/50', 'active:scale-95', 'focus:outline-none', 'focus:ring-2', 'focus:ring-red-500', 'focus:ring-offset-2');
        delButton.setAttribute('onclick', `delObj(${data.id})`);
        delButton.innerHTML = `<div class="flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                            </svg>
                                        </div>`;
        buttonsDiv.appendChild(delButton);

        const getButton = document.createElement('button');
        getButton.classList.add('w-full', 'sm:w-auto', 'px-4', 'sm:px-6', 'py-2', 'bg-purple-500', 'text-white', 'text-sm', 'sm:text-base', 'font-medium', 'rounded-lg', 'transition-all', 'duration-300', 'hover:bg-purple-600', 'hover:shadow-lg', 'hover:shadow-purple-300/50', 'active:scale-95', 'focus:outline-none', 'focus:ring-2', 'focus:ring-purple-500', 'focus:ring-offset-2');
        getButton.setAttribute('onclick', `getDataObj(${data.id})`);
        getButton.innerHTML = `<div class="flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                            </svg>
                                        </div>`;
        buttonsDiv.appendChild(getButton);
        flexDiv.appendChild(buttonsDiv);
        textDiv.appendChild(flexDiv);
        card.appendChild(textDiv);

        lst.prepend(card)
    } else {
        alert('Ошибка при создании...')
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = document.querySelector("#submit-btn");
    if (button.textContent.trim() === "Создать") {
        console.log("Создание объекта...")
        await createObj()
    } else if (button.textContent.trim() === "Обновить") {
        console.log("Обновление объекта...")
        const objId = button.getAttribute("data-id")
        await updateObj(objId)
    }
});

async function updateObj(objId) {
    const formData = new FormData(form)
    const imageInput = document.getElementById('imageInput')
    if (!imageInput.files.length) {
        formData.delete('image')
    }
    closeDataForm()
    const card = document.querySelector(`[data-news-id="${objId}"]`)
    card.classList.add('card-loading')
    const res = await fetch(`https://orozking.pythonanywhere.com/api/v1/news/${objId}/`, {
        method: 'PUT',
        headers: {
            Authorization: 'Token b44d3d3a5b689c7c4f00585bfb3ec66269438e51',
        },
        body: formData,
    });

    if (res.ok) {
        data = await res.json()
        console.log(data);
        
        console.log(data.name);
        console.log(`Успешно обновлена новость с ID: ${objId}`)
        addMessage({ text: `Успешно обновлена новость с ID: ${objId}`, type: 'success', duration: 5000 });
        card.querySelector('h3').textContent = data.name
        if (data.image) {
            card.querySelector('img').src = data.image
        }
    } else {
        console.error('Ошибка обновления объекта')
    }
    card.classList.remove('card-loading')
}



async function delObj(obj_id) {
    const card = document.querySelector(`[data-news-id="${obj_id}"]`)
    const res = await fetch(`https://orozking.pythonanywhere.com/api/v1/news/${obj_id}/`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Token b44d3d3a5b689c7c4f00585bfb3ec66269438e51',
        },

    })
    if (res.ok) {
        card.style.transition = 'opacity 0.3s ease';
        card.style.opacity = '0';
        setTimeout(() => {
            card.remove()
        }, 300);
        console.log(`Успешно удален объект с ID ${obj_id}`)
        addMessage({ text: `Успешно удален объект с ID ${obj_id}`, type: 'success', duration: 5000 });
    } else {
        console.log('Не удалось удалить объект!')
    }

}


async function getDataObj(obj_id) {
    const res = await fetch(`https://orozking.pythonanywhere.com/api/v1/news/${obj_id}/`, {
        method: 'GET',
        headers: {
            Authorization: 'Token b44d3d3a5b689c7c4f00585bfb3ec66269438e51',
        }
    })
    if (res.ok) {
        const data = await res.json()
        console.log(data);

        updateButton = document.querySelector('#submit-btn')
        updateButton.textContent = `Обновить`
        updateButton.setAttribute('data-id', obj_id)
        showDataForm()
        document.querySelector('input[name=name]').value = data.name
        document.querySelector('textarea[name=content]').value = data.content
        document.querySelector('textarea[name=description]').value = data.description
        const categories = document.querySelector('select[name="category"]')
        for (const option of categories.options) {
            if (+option.value === data.category.id) {
                option.selected = true
                break
            }
        }

        const tags = document.querySelector('select[name="tags"]');
        for (const option of tags.options) {
            option.selected = data.tags.some(tag => tag.id === +option.value)
        }

        const check = document.querySelector('input[name="is_published"]').checked = data.is_published
        console.log(check);
        
    }
}


async function launch() {
    await load_objects()
    const categories = document.querySelector('#categories')
    await loadSelectOptions('https://orozking.pythonanywhere.com/api/v1/categories/', categories, 'categories')
    const tags = document.querySelector('#tags')
    await loadSelectOptions('https://orozking.pythonanywhere.com/api/v1/tags/', tags, 'tags')
}
launch()

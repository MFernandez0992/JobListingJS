document.addEventListener('DOMContentLoaded', () => {
    const dataUrl = './assets/data.json'; // Asegúrate de que esta ruta sea correcta
    const jobListing = document.querySelector('#jobListing');
    const searchInput = document.querySelector('input');

    // Función para obtener y mostrar los datos
    fetch(dataUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener el JSON');
        }
        return response.json(); // Convierte la respuesta a un objeto JSON
    })
    .then(data => {
        console.log('Data fetched:', data); // Verifica los datos obtenidos en la consola

        data.forEach((job, i) => {
            const div = document.createElement('div');
            div.classList.add('flex', 'items-center', 'justify-between', 'rounded-md', 'bg-white', 'p-8', 'shadow-md', 'border-l-[6px]', 'border-l-DesaturatedDarkCyan');

            div.innerHTML = `
                <div class="flex items-center gap-6">
                    <div>
                        <img src='${job.logo}' alt="Logo ${job.company}">
                    </div>
                    <div>
                        <div class="flex gap-6 font-bold items-center">
                            <p class="text-DesaturatedDarkCyan text-lg">${ job.company }</p>
                            <p class="py-1 px-2 bg-DesaturatedDarkCyan text-sm text-white rounded-full ${ job.new ? '' : 'hidden' }">
                                ${ job.new ? 'NEW!' : '' }
                            </p>
                            <p class="py-1 px-2 text-white bg-VeryDarkGrayishCyan text-sm rounded-full ${ job.featured ? '' : 'hidden' }">
                                ${ job.featured ? 'FEATURED' : ''}
                            </p>
                        </div>
                        <h2 class="font-bold text-xl">${ job.position }</h2>
                        <div class="flex gap-6 text-DarkGrayishCyan font-medium">
                            <p>${ job.postedAt }</p>
                            <p>${ job.contract }</p>
                            <p>${ job.location }</p>
                        </div>
                    </div>
                </div>

                <div class="flex gap-6 text-DesaturatedDarkCyan text-sm font-bold">
                    <p class="bg-DesaturatedDarkCyan bg-opacity-30 p-1 rounded-md flex items-center py-1 px-2">${ job.role }</p>
                    <p class="bg-DesaturatedDarkCyan bg-opacity-30 py-1 flex items-center px-2 rounded-md">${ job.level }</p>

                    ${ job.languages.map(language => 
                        `<p class="bg-DesaturatedDarkCyan bg-opacity-30 py-1 flex items-center px-2 rounded-md">${language}</p>`
                    ).join('') }
                </div>
            `;

            jobListing.appendChild(div);
        });
    })
    .catch(error => {
        console.error('Error:', error); // Manejo de errores
    });

    searchInput.addEventListener('input', e => console.log( e.target.value ));


    /*
    
    1. Mostrar en el section todos los trabajos que vienen en el JSON.
    2. Si el usuario busca un trabajo en particular, ocultar los de defecto y solo mostrar los de la búsqueda

    */
});

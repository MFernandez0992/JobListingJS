document.addEventListener('DOMContentLoaded', () => {
    /* Selectors and Variables*/
    const dataUrl = './assets/data.json';
    const jobListing = document.querySelector('#jobListing');
    const searchBtn = document.querySelector('#searchBtn');
    let jobs = [];

    // Fetch Data
    fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
        jobs = data;
        showJobs(jobs);
    })
    .catch(error => console.error('Error:', error));

    /* EventListener */
    searchBtn.addEventListener('click', () => {
        const filters = getFilters();
        const jobsFiltered = jobFilters(filters);
        jobListing.innerHTML = ''; // Reset HTML

        if (jobsFiltered.length === 0) {
            noResultsMessage();
        } else {
            showJobs(jobsFiltered);
        }
    });

    /* Functions */
    function getFilters() {
        const seniority = document.querySelector('input[name="seniority"]:checked')?.value;
        const stack = document.querySelector('input[name="stack"]:checked')?.value;
        const technologies = Array.from(document.querySelectorAll('input[name="technologies"]:checked')).map(checkbox => checkbox.value);
        return { seniority, stack, technologies };
    }

    function jobFilters({ seniority, stack, technologies }) {
        return jobs.filter(job => {
            const matchesSeniority = !seniority || job.level === seniority;
            const matchesStack = !stack || job.role === stack;
            const matchesTechnologies = technologies.length === 0 || technologies.every(tech => job.languages.includes(tech));

            return matchesSeniority && matchesStack && matchesTechnologies;
        });
    }

    /* Generate HTML */
    function showJobs(jobs) {
        jobs.forEach(job => {
            const div = document.createElement('div');
            div.classList.add('flex', 'flex-col', 'md:flex-row', 'items-center', 'justify-between', 'rounded-md', 'bg-white', 'p-8', 'shadow-md', 'border-l-[6px]', 'border-l-DesaturatedDarkCyan', 'gap-6', 'md:gap-0');
            
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
    }

    /* No results message */
    function noResultsMessage() {
        const message = document.createElement('div');
        message.classList.add('text-center', 'text-lg', 'text-gray-600', 'p-4');
        message.textContent = 'No jobs were found that match the applied filters.';
        jobListing.appendChild(message);
    }
});

import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from "./localstorage.js";

let appendToDo = document.getElementById('appendToDo');
let appendInPro = document.getElementById('appendInPro');
let appendComp = document.getElementById('appendComp');

let todoCount = document.getElementById('todoCount');
let InProCount = document.getElementById('InProCount');
let compCount = document.getElementById('compCount');


let nameInput = document.getElementById('nameInput');
let descInput = document.getElementById('descInput');
let prioElement = document.getElementById('prioElement');
let statusElement = document.getElementById('statusElement');
let saveBtn = document.getElementById('saveBtn');


let todoCountVar = 0;
let inProCountVar = 0;
let compCountVar = 0;

let index = 0;

createTask();

saveBtn.addEventListener('click', () => {
    let saveArr = {};
    saveArr.name = nameInput.value;
    saveArr.desc = descInput.value;
    saveArr.priority = prioElement.value;
    saveArr.status = statusElement.value;
    saveToLocalStorage(saveArr);
    createTask();
})





function createTask() {
    appendToDo.textContent = "";
    appendInPro.textContent = "";
    appendComp.textContent = "";

    let tasks = getlocalStorage()

    const taskArray = Object.values(tasks);
    console.log(taskArray);
    taskArray.map(element => {
        console.log();
        makeElement(element.name, element.desc, element.priority, element.status, index);
    })


}


function makeElement(name, desc, priority, status, index) {
    let outDiv = document.createElement('div');
    outDiv.className = ("flex justify-center mb-10");

    let inDiv = document.createElement('div');
    inDiv.className = ("bg-blue-500 w-96 h-auto rounded-lg p-4");

    let pName = document.createElement('p');
    pName.className = ("pb-10");
    pName.textContent = name;

    let optBtn = document.createElement('button');
    optBtn.className = ("text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full")
    optBtn.textContent = "Task Options"
    let viewBtn = document.createElement('button');
    viewBtn.className = ("text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full")
    viewBtn.textContent = "View Task"
    viewBtn.setAttribute('data-modal-target', name);
    viewBtn.setAttribute('data-modal-toggle', name);

    inDiv.append(pName);
    inDiv.append(optBtn);
    inDiv.append(viewBtn);
    outDiv.append(inDiv);

    let modal = createNewTaskModal(name, desc, index);
    outDiv.append(modal);

    switch (status) {
        case "to-do":
            appendToDo.append(outDiv);
            todoCountVar++;
            todoCount.textContent = todoCountVar;

            break;
        case "inProgress":
            appendInPro.append(outDiv);
            inProCountVar++;
            InProCount.textContent = inProCountVar
            break;
        case "completed":
            appendComp.append(outDiv);
            compCountVar++;
            compCount.textContent = compCountVar;
            break;

        default:
            break
    }

}

function createNewTaskModal(taskName, taskDesc, index) {
    // Create the main div element
    var newTaskModal = document.createElement('div');
    newTaskModal.id = taskName;

    newTaskModal.setAttribute('tabindex', index);
    newTaskModal.setAttribute('aria-hidden', 'true');
    newTaskModal.classList.add('hidden', 'overflow-y-auto', 'overflow-x-hidden', 'fixed', 'top-0', 'right-0', 'left-0', 'z-50', 'justify-center', 'items-center', 'w-full', 'md:inset-0', 'h-[calc(100%-1rem)]', 'max-h-full');

    // Create the inner div elements
    var innerDiv1 = document.createElement('div');
    innerDiv1.classList.add('relative', 'p-4', 'w-full', 'max-w-2xl', 'max-h-full');

    var innerDiv2 = document.createElement('div');
    innerDiv2.classList.add('relative', 'bg-white', 'rounded-lg', 'shadow', 'dark:bg-gray-700');

    // Modal header
    var modalHeader = document.createElement('div');
    modalHeader.classList.add('flex', 'items-center', 'justify-between', 'p-4', 'md:p-5', 'border-b', 'rounded-t', 'dark:border-gray-600');

    var headerTitle = document.createElement('h3');
    headerTitle.classList.add('text-xl', 'font-semibold', 'text-gray-900', 'dark:text-white');
    headerTitle.textContent = taskName;

    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('text-gray-400', 'bg-transparent', 'hover:bg-gray-200', 'hover:text-gray-900', 'rounded-lg', 'text-sm', 'w-8', 'h-8', 'ms-auto', 'inline-flex', 'justify-center', 'items-center', 'dark:hover:bg-gray-600', 'dark:hover:text-white');
    closeButton.setAttribute('data-modal-hide', taskName);

    var closeIcon = document.createElement('svg');
    closeIcon.classList.add('w-3', 'h-3');
    closeIcon.setAttribute('aria-hidden', 'true');
    closeIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    closeIcon.setAttribute('fill', 'none');
    closeIcon.setAttribute('viewBox', '0 0 14 14');

    var closePath = document.createElement('path');
    closePath.setAttribute('stroke', 'currentColor');
    closePath.setAttribute('stroke-linecap', 'round');
    closePath.setAttribute('stroke-linejoin', 'round');
    closePath.setAttribute('stroke-width', '2');
    closePath.setAttribute('d', 'm1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6');

    var closeSpan = document.createElement('span');
    closeSpan.classList.add('sr-only');
    closeSpan.textContent = 'Close modal';

    // Append close icon elements
    closeIcon.appendChild(closePath);
    closeButton.appendChild(closeIcon);
    closeButton.appendChild(closeSpan);

    // Append header elements
    modalHeader.appendChild(headerTitle);
    modalHeader.appendChild(closeButton);

    // Modal body
    var modalBody = document.createElement('div');
    modalBody.classList.add('p-4', 'md:p-5', 'space-y-4', 'text-black');

    var desDiv = document.createElement('div');
    desDiv.classList = "items-center grid grid-cols-6"
    var desHead = document.createElement('p');
    desHead.textContent = "Description: ";
    desHead.className = ("pe-6");
    var desBody = document.createElement('p');
    desBody.textContent = taskDesc;
    desBody.className = ("col-span-5");

    desDiv.appendChild(desHead);
    desDiv.appendChild(desBody);


    // First select option group
    var selectDiv1 = document.createElement('div');
    selectDiv1.classList.add('items-center', 'grid', 'grid-cols-6');

    var selectLabel1 = document.createElement('p');
    selectLabel1.classList.add('pe-6');
    selectLabel1.textContent = 'Priority:';

    var select1 = document.createElement('select');
    select1.classList.add('bg-gray-50', 'border', 'border-gray-300', 'text-gray-900', 'text-sm', 'rounded-lg', 'focus:ring-blue-500', 'focus:border-blue-500', 'block', 'w-full', 'p-2.5', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:placeholder-gray-400', 'dark:text-white', 'dark:focus:ring-blue-500', 'dark:focus:border-blue-500', 'col-span-5');

    var option1Default = document.createElement('option');
    option1Default.setAttribute('selected', 'selected');
    option1Default.textContent = 'Select a Priority';

    var option1Low = document.createElement('option');
    option1Low.setAttribute('value', 'low');
    option1Low.textContent = 'Low';

    var option1Medium = document.createElement('option');
    option1Medium.setAttribute('value', 'medium');
    option1Medium.textContent = 'Medium';

    var option1High = document.createElement('option');
    option1High.setAttribute('value', 'high');
    option1High.textContent = 'High';

    // Append options to select element
    select1.appendChild(option1Default);
    select1.appendChild(option1Low);
    select1.appendChild(option1Medium);
    select1.appendChild(option1High);

    // Append select elements to div
    selectDiv1.appendChild(selectLabel1);
    selectDiv1.appendChild(select1);

    // Second select option group
    var selectDiv2 = document.createElement('div');
    selectDiv2.classList.add('items-center', 'grid', 'grid-cols-6');

    var selectLabel2 = document.createElement('p');
    selectLabel2.classList.add('pe-6');
    selectLabel2.textContent = 'Status:';

    var select2 = document.createElement('select');
    select2.classList.add('bg-gray-50', 'border', 'border-gray-300', 'text-gray-900', 'text-sm', 'rounded-lg', 'focus:ring-blue-500', 'focus:border-blue-500', 'block', 'w-full', 'p-2.5', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:placeholder-gray-400', 'dark:text-white', 'dark:focus:ring-blue-500', 'dark:focus:border-blue-500', 'col-span-5');

    var option2Default = document.createElement('option');
    option2Default.setAttribute('selected', 'selected');
    option2Default.textContent = 'Choose a Status';

    var option2ToDo = document.createElement('option');
    option2ToDo.setAttribute('value', 'to-do');
    option2ToDo.textContent = 'To-Do';

    var option2InProgress = document.createElement('option');
    option2InProgress.setAttribute('value', 'inProgress');
    option2InProgress.textContent = 'In Progress';

    var option2Completed = document.createElement('option');
    option2Completed.setAttribute('value', 'completed');
    option2Completed.textContent = 'Completed';

    // Append options to select element
    select2.appendChild(option2Default);
    select2.appendChild(option2ToDo);
    select2.appendChild(option2InProgress);
    select2.appendChild(option2Completed);

    // Append select elements to div
    selectDiv2.appendChild(selectLabel2);
    selectDiv2.appendChild(select2);

    // Append all elements to modal body
    modalBody.appendChild(desDiv);
    modalBody.appendChild(selectDiv1);
    modalBody.appendChild(selectDiv2);

    // Append modal header and body to inner div2
    innerDiv2.appendChild(modalHeader);
    innerDiv2.appendChild(modalBody);

    // Append inner div2 to inner div1
    innerDiv1.appendChild(innerDiv2);

    // Append inner div1 to main div
    newTaskModal.appendChild(innerDiv1);

    // Return the created new task modal
    return newTaskModal;


}

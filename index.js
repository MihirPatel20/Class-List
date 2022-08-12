//SELECTORS
const addButton = document.querySelector('.add-button');
const table = document.querySelector('.main-container');




//ADD EVENT LISTENER
addButton.addEventListener('click', addList);
table.addEventListener('click', applyAction);



//FUNCTIONS
function addList(event) {
    event.preventDefault();

    //New List-row Div
    const newListDiv = document.createElement('div');
    newListDiv.classList.add("table-row");

    //New Action section Div
    const actionColumnDiv = document.createElement('div');
    actionColumnDiv.classList.add("action-col");
    actionColumnDiv.innerHTML = "<i class='fa-solid fa-arrows-up-down-left-right'></i> <i class='fa-solid fa-arrow-left'></i> <i class='fa-solid fa-arrow-right'></i> <i class='fa-solid fa-trash'></i>"
    //Append new action section to List-row
    newListDiv.appendChild(actionColumnDiv);

    //New List section Div
    const listColumnDiv = document.createElement('div');
    listColumnDiv.classList.add("list-col");
    //create New input element to write standard
    listColumnDiv.innerHTML = "<input type='text' class='list-input list-col parent' name='newText' autocomplete='off' value='' placeholder='Add Standard'>";
    newListDiv.appendChild(listColumnDiv);

    //Add divider below wvwry new row to separate them
    const divider = document.createElement('hr')
    //Append new List section to List-row
    newListDiv.appendChild(divider);


    //Append New List-row to table
    table.appendChild(newListDiv);
}

function applyAction(e) {
    const item = e.target

    const currentActionColumn = item.parentElement;
    const currentListColumn = currentActionColumn.nextElementSibling;
    const currentRow = currentActionColumn.parentElement;



    //delete list
    if (item.classList[1] === "fa-trash") {

        const currentRowInputElement = currentListColumn.firstElementChild;
        const nextRow = currentRow.nextElementSibling;
        const nextRowActionColumn = nextRow.firstElementChild;
        const nextRowListColumn = nextRowActionColumn.nextElementSibling;


        if (currentRowInputElement.classList[2] === "parent") {
            if (nextRowListColumn.classList[1] === "child-padding") {
                nextRow.remove();
            }
        }
        if (currentRowInputElement.classList[2] === "child") {
            if (nextRowListColumn.classList[2] === "grand-child-padding") {
                nextRow.remove();
            }
        }

        currentRow.remove();
    }

        //Indent List
        if (item.classList[1] === "fa-arrow-right") {
            const inputElement = currentListColumn.firstElementChild;

            if (inputElement.classList[2] === "parent") {
                inputElement.classList.remove("parent")
                inputElement.classList.add("child")
                currentListColumn.classList.add("child-padding")
            }
            else if (inputElement.classList[2] === "child") {
                inputElement.classList.remove("child")
                inputElement.classList.add("grand-child")
                currentListColumn.classList.add("grand-child-padding")
            }

        }

        //Outdent List
        if (item.classList[1] === "fa-arrow-left") {
            const inputElement = currentListColumn.firstElementChild;

            if (inputElement.classList[2] === "grand-child") {
                inputElement.classList.remove("grand-child")
                inputElement.classList.add("child")
                currentListColumn.classList.remove("grand-child-padding")
            }
            else if (inputElement.classList[2] === "child") {
                inputElement.classList.remove("child")
                inputElement.classList.add("parent")
                currentListColumn.classList.remove("child-padding")
            }

        }

        //Drag & Drop
        if (item.classList[1] === "fa-arrows-up-down-left-right") {
            new Sortable(table, {
                Animation: 350
            });
        }

    }

const decksContainer = document.querySelector('[data-decks]')
const newDeckForm = document.querySelector('[data-new-deck-form]')
const newDeckInput = document.querySelector('[data-new-deck-input]')
const deleteDeckButton = document.querySelector('[data-delete-deck-button]')
const deckDisplayContainer = document.querySelector('[data-deck-display-container]')
const deckTitleElem = document.querySelector('[data-deck-title]')
const deckCountElem = document.querySelector('[data-flashcard-count]')
const flashcardContainer = document.querySelector('[data-flashcards]')
const flashcardTemplate = document.getElementById('flashcard-template')
const newFlashcardForm = document.querySelector('[data-new-flashcard-form]')
const newFlashcardInput = document.querySelector('[data-new-flashcard-input]')
const clearFlashcardsButton = document.querySelector('[data-clear-studied-flashcards-button]')
/* container pentru deck */
const LOCAL_STORAGE_DECK_KEY = 'flashcard.lists'
const LOCAL_STORAGE_SELECTED_DECK_ID_KEY =  'flashcard.selectedDeckId'
let decks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DECK_KEY)) ||[]
let selectedDeckId = localStorage.getItem
(LOCAL_STORAGE_SELECTED_DECK_ID_KEY)

decksContainer.addEventListener
    (
    'click', e=>
    {
    if(e.target.tagName.toLowerCase() ==='li')
    {
        selectedDeckId = e.target.dataset.deckId
        saveANDrender()
    }
    }
    )
    
flashcardContainer.addEventListener('click', e=>
{
    if(e.target.tagName.toLowerCase() === 'input')
    {
        const selectedDeck = decks.find(deck => deck.id === selectedDeckId)
        const selectedFlashcard = selectedDeck.flashcards.find(flashcard => flashcard.id === e.target.id)
        selectedFlashcard.complete = e.target.checked
        save()
        renderFlashcardCount(selectedDeck)
    }
})

clearFlashcardsButton.addEventListener('click', e=>
{
    const selectedDeck = decks.find(deck => deck.id === selectedDeckId)
    selectedDeck.flashcards = selectedDeck.flashcards.filter(flashcard => !flashcard.complete)
    saveANDrender()
})

deleteDeckButton.addEventListener('click', e=>
{
    decks = decks.filter(deck => deck.id != selectedDeckId)
    selectedDeckId = null
    saveANDrender()
})

newDeckForm.addEventListener('submit', e=>
{
    e.preventDefault()
    const deckName = newDeckInput.value 
    if(deckName == null || deckName === '') return
    const deck = createDeck(deckName)
    newDeckInput.value = null
    decks.push(deck)
    saveANDrender()
})

newFlashcardForm.addEventListener('submit', e=>
{
    e.preventDefault()
    const flashcardName = newFlashcardInput.value 
    if(flashcardName == null || flashcardName === '') return
    const flashcard = createFlashcard(flashcardName)
    newFlashcardInput.value = null
    const selectedDeck = decks.find(deck => deck.id ===selectedDeckId)
    selectedDeck.flashcards.push(flashcard)
    saveANDrender()
})

function createFlashcard(question)
{
    return { id:Date.now().toString(), name: question, complete: false }
}

function createDeck(name)
{
    return { id: Date.now().toString(), name: name, flashcards: 
        [] }
}

function save()
{
    localStorage.setItem(LOCAL_STORAGE_DECK_KEY, JSON.stringify(decks))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_DECK_ID_KEY, selectedDeckId)
}
function saveANDrender()
{
    save()
    render()
}

function renderDecks()
{
    decks.forEach(deck =>
        {
            const deckElem = document.createElement('li')
            deckElem.dataset.deckId = deck.id
            deckElem.classList.add("deck-name")
            deckElem.innerText = deck.name
            if(decks.id === selectedDeckId) 
            deckElem.classList.add ('active-deck')
            decksContainer.appendChild(deckElem)
        })
}

function render ()
{
    clearElem(decksContainer)
    renderDecks()
    
    const selectedDeck = decks.find(deck => deck.id === selectedDeckId)

    if(selectedDeckId == null)
    {
        deckDisplayContainer.style.display = 'none'
    }
    else
    {
        deckDisplayContainer.style.display = ''
        deckTitleElem.innerText = selectedDeck.name
        renderFlashcardCount(selectedDeck)
        clearElem(flashcardContainer)
        renderFlashcards(selectedDeck)
    }
}

function renderFlashcards(selectedDeck)
{
    selectedDeck.flashcards.forEach(flashcard => 
        {const flashcardElem = document.importNode(flashcardTemplate.content, true)
         const checkbox = flashcardElem.querySelector('input') 
         checkbox.id = flashcard.id
         checkbox.checked = flashcard.complete  
         const label = flashcardElem.querySelector('label')
         label.htmlFor = flashcard.id
         label.append(flashcard.name)
         flashcardContainer.appendChild(flashcardElem)
        }
        )
}

function renderFlashcardCount(selectedDeck)
{
    const incompleteFlashcardCount = selectedDeck.flashcards.filter
    (flashcard =>!flashcard.complete).length
    const flashcardString = incompleteFlashcardCount === 1? "flashcard": "flashcards"
    deckCountElem.innerText = `${incompleteFlashcardCount} ${flashcardString} remaining`
}

function clearElem(elem)
{
    while(elem.firstChild)
    {
        elem.removeChild(elem.firstChild)
    }
}
render()

document.addEventListener('DOMContentLoaded', () => {
    const flipButton = document.getElementById('flip-button');
    const flashcard = document.getElementById('flashcard');
    const elementName = document.getElementById('element-name');
    const elementSymbol = document.getElementById('element-symbol');
    const masterlistButton = document.getElementById('masterlist');
    const modal = document.getElementById('masterlist-modal');
    const closeModal = document.getElementById('close-modal');
    const elementList = document.getElementById('element-list');
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');

    const elements = [
        { name: "Aluminum", symbol: "Al" },
        { name: "Lithium", symbol: "Li" },
        { name: "Magnesium", symbol: "Mg" },
        { name: "Argon", symbol: "Ar" },
        { name: "Mercury", symbol: "Hg" },
        { name: "Bismuth", symbol: "Bi" },
        { name: "Barium", symbol: "Ba" },
        { name: "Neon", symbol: "Ne" },
        { name: "Beryllium", symbol: "Be" },
        { name: "Nickel", symbol: "Ni" },
        { name: "Boron", symbol: "B" },
        { name: "Nitrogen", symbol: "N" },
        { name: "Bromine", symbol: "Br" },
        { name: "Oxygen", symbol: "O" },
        { name: "Calcium", symbol: "Ca" },
        { name: "Phosphorus", symbol: "P" },
        { name: "Carbon", symbol: "C" },
        { name: "Platinum", symbol: "Pt" },
        { name: "Potassium", symbol: "K" },
        { name: "Chlorine", symbol: "Cl" },
        { name: "Radium", symbol: "Ra" },
        { name: "Chromium", symbol: "Cr" },
        { name: "Radon", symbol: "Rn" },
        { name: "Cobalt", symbol: "Co" },
        { name: "Copper", symbol: "Cu" },
        { name: "Fluorine", symbol: "F" },
        { name: "Silicon", symbol: "Si" },
        { name: "Gallium", symbol: "Ga" },
        { name: "Silver", symbol: "Ag" },
        { name: "Sodium", symbol: "Na" },
        { name: "Gold", symbol: "Au" },
        { name: "Helium", symbol: "He" },
        { name: "Sulfur", symbol: "S" },
        { name: "Hydrogen", symbol: "H" },
        { name: "Tin", symbol: "Sn" },
        { name: "Iodine", symbol: "I" },
        { name: "Iron", symbol: "Fe" },
        { name: "Uranium", symbol: "U" },
        { name: "Lead", symbol: "Pb" },
        { name: "Zinc", symbol: "Zn" }
    ];

    let currentIndex = 0;

    function displayFlashcard(index) {
        elementName.textContent = elements[index].name;
        elementSymbol.textContent = elements[index].symbol;
        flashcard.classList.remove('flip'); // Ensure the card is flipped to the name side
    }

    displayFlashcard(currentIndex);

    flipButton.addEventListener('click', () => {
        flashcard.classList.toggle('flip');
    });

    nextButton.addEventListener('click', () => {
        if (flashcard.classList.contains('flip')) {
            flashcard.classList.remove('flip'); // Flip back to name side
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % elements.length;
                displayFlashcard(currentIndex);
            }, 600); // Wait for flip transition to complete
        } else {
            currentIndex = (currentIndex + 1) % elements.length;
            displayFlashcard(currentIndex);
        }
    });

    previousButton.addEventListener('click', () => {
        if (flashcard.classList.contains('flip')) {
            flashcard.classList.remove('flip'); // Flip back to name side
            setTimeout(() => {
                currentIndex = (currentIndex - 1 + elements.length) % elements.length;
                displayFlashcard(currentIndex);
            }, 600); // Wait for flip transition to complete
        } else {
            currentIndex = (currentIndex - 1 + elements.length) % elements.length;
            displayFlashcard(currentIndex);
        }
    });

    masterlistButton.addEventListener('click', () => {
        modal.style.display = 'flex';
        populateMasterlist();
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    function populateMasterlist() {
        elementList.innerHTML = '';
        elements.forEach(el => {
            const li = document.createElement('li');
            li.textContent = `${el.name}: ${el.symbol}`;
            elementList.appendChild(li);
        });
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});

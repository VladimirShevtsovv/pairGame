(function() {
    function createForm() {

        // Создаем контейнер для формы
        const formContainer = document.createElement('form');
        formContainer.classList.add('form_container');

        // Создаем заголовок формы
        const amountCardsHeading = document.createElement('h2');
        amountCardsHeading.innerHTML = 'Введите количесво карт по вертикали/горизонтали(Четное от 2 до 10)';

        // Создаем инпут формы
        const amountCardsInput = document.createElement('input');
        amountCardsInput.classList.add('form_input');

        // Создаем кнопуку создания новой игры
        const button = document.createElement('button');
        button.textContent = 'Начать игру';
        button.classList.add('form_button');

        // Создаем заголовок ,который появится после окончания игры
        const win = document.createElement('h2')
        win.innerHTML = 'Поздравляем вы выиграли';
        win.classList.add('hidden')
            // Создаем заголовок ,который появится после окончания врмени
        const time = document.createElement('h2')
        time.innerHTML = 'Время вышло'
        time.classList.add('hidden')
            // Создаем кнопку ,которая появится после окончания игры
        const buttonNewGame = document.createElement('button');
        buttonNewGame.textContent = 'Играть еще раз';
        buttonNewGame.classList.add('form_button');

        // Создаем контейнер для кнопки и заголовка , которые появляются после окончания игры
        const hiddenContainer = document.createElement('div')
        hiddenContainer.classList.add('hidden');

        // Помещаем в контейнер, который появится после окончания игры, заголовок и конпку
        hiddenContainer.append(win, buttonNewGame, time)
            // Помещаем в контейнер формы, заголовок инпут и кнопку
        formContainer.append(amountCardsHeading, amountCardsInput, button, hiddenContainer);

        return {
            formContainer,
            amountCardsInput,
            button,
            amountCardsHeading,
            hiddenContainer,
            buttonNewGame,
            win,
            time,
        };

    }

    // функция - нажатие на кнопку после окончания игры 
    function endGame(containerWithForm) {
        containerWithForm.amountCardsHeading.classList.remove('hidden')
        containerWithForm.amountCardsInput.classList.remove('hidden')
        containerWithForm.button.classList.remove('hidden')
        containerWithForm.hiddenContainer.classList.add('hidden');
    }
    // функция - изменение ширины поля в зависимости какое чилос введено 
    function widthOfFIeld(value) {
        if (Number(value) === 2) {
            container.style.width = '300px';
        }
        if (Number(value) === 6) {
            container.style.width = '770px';
        }
        if (Number(value) === 8) {
            container.style.width = '970px';
        }
        if (Number(value) === 10) {
            container.style.width = '1170px';
        }
    }

    // функция -создание массива с парами и создания карт со случайными числами
    function randomNumberInCard(array) {
        let randomNumber = Math.floor(Math.random() * array.length); // перменная с индексом сулчайного чилсо миз массива
        let valueOfrandomNumber = array[randomNumber]; // перменная с самим числом под этим мндексом
        // создаем div со случайным числом(содержимое карты)
        let containerWithRandomNumber = document.createElement('div');
        containerWithRandomNumber.classList.add('cards_hidden');
        // создаем div (сама карта)
        let cards = document.createElement('div');
        cards.classList.add('cards');
   

        // помещаем число в div(содержимое краты), а его в div(сама карта)
        containerWithRandomNumber.append(valueOfrandomNumber);
        cards.append(containerWithRandomNumber);
        container.append(cards);
        // Цикл для того, что бы взять случайное число из массива с парами и удалить его из этого массива
        for (let x = array.length - 1; x >= 0; x--) {
            array.splice(randomNumber, 1);
            break
        }

        return {
            randomNumber,
            valueOfrandomNumber,
            containerWithRandomNumber,
            cards
        }
    }
    // функция -скрытие формы 
    function hiddenForm(containerWtihForm) {
        containerWtihForm.amountCardsHeading.classList.add('hidden')
        containerWtihForm.amountCardsInput.classList.add('hidden')
        containerWtihForm.button.classList.add('hidden')

    }
    // функция -очиска поля и вывод сообщения о конце игры по времени
    function time(mainContainer, containerWithForm) {
        mainContainer.innerHTML = '';
        containerWithForm.hiddenContainer.classList.add('form_container');
        containerWithForm.hiddenContainer.classList.remove('hidden');
        containerWithForm.time.classList.remove('hidden');
    }
    // функция -очиска поля и вывод сообщения о конце игры
    function endMessange(mainContainer, containerWithForm) {
        mainContainer.innerHTML = '';
        containerWithForm.hiddenContainer.classList.add('form_container');
        containerWithForm.hiddenContainer.classList.remove('hidden');
        containerWithForm.win.classList.remove('hidden');
    }

    document.addEventListener('DOMContentLoaded', function() {
        let form = createForm(); // Создаем форму
        document.body.prepend(form.formContainer); // Помещаем созданную форму на html страницу

        // ЧТо происходит после клика на кнопку, которая появю после оконачния игры
        form.buttonNewGame.addEventListener('click', endGame(form))

        // переменная для интервала 
        let interval;

        // ЧТо происходит после клика на кнопку в начале игры
        form.button.addEventListener('click', function(e) {
            e.preventDefault();
            // создаем переменную для обращения к container
            let container = document.getElementById('container');

            // Запуск таймера по окончании которого игра закончиться 


            // Скрываем форму
            hiddenForm(form)

            // Находим значение инпута и очищаем инпут
            let inputValue = form.amountCardsInput.value;
            widthOfFIeld(inputValue);
            form.amountCardsInput.value = '';

            // Если в контейнере что то есть , то происходит удаление
            if (container !== '') {
                container.innerHTML = '';
            }
            // Если значение инпута нечетное или не в диапазоне от 2 до 10
            if (inputValue % 2 !== 0) {
                inputValue = 4;
            }
            if (inputValue > 10 || inputValue < 2) {
                inputValue = 4;
            }
            // создаем переменную для опредления сколько пар должно быть
            let amoutArrayNumbers = (inputValue * inputValue) / 2;
            // создаем массив для пар
            let arrayWithNumbers = [];
            // помещаем в  массив все пары
            for (i = 1; i < amoutArrayNumbers + 1; ++i) {
                arrayWithNumbers.push(i);
                arrayWithNumbers.push(i);
            }
            let b = 0; // переменная для счета карт
            let arrayComparison = []; // Массив в который помещаются сравниваемые элементы
            let kol = 0; // переменная для счета пар

            // Цикл для создания строк с картами
            for (j = 0; j < inputValue; ++j) {

                // Цикл для создания столбцов с картами
                for (i = 0; i < inputValue; ++i) {
                    let random = randomNumberInCard(arrayWithNumbers)
                    random.cards.addEventListener('click', function() {
                        random.containerWithRandomNumber.classList.remove('cards_hidden'); // При нажатии делать содердимое карты видимым
                        random.containerWithRandomNumber.classList.add('comparison'); // При нажатии добавляем класс для сравнения для div(содержимое краты)
                        random.cards.classList.add('comparison_cards'); // При нажатии добавляем класс для сравнения для div(сама карта)
                        b = b + 1; // переменная для счета карт
                        arrayComparison.push(random.containerWithRandomNumber.textContent); // При нажатии на карту добавляем ее в масств сравнения
                        clearTimeout(interval); // Обновляем интервал при нажатии
                        console.log(arrayComparison)
                        interval = setTimeout(function() {
                            // Что происходит если выбрано 2 карты

                            if (b === 2) {
                                b = 0; //Обновляем счетчика карты
                                //Создаем переменные для обращения к нажатым картам
                                let elements = document.querySelectorAll(".comparison");
                                let elementsCards = document.querySelectorAll(".comparison_cards");
                                //Если карты две то убираем класс сравнения 
                                for (let i = 0; i < elements.length; i++) {
                                    elements[i].classList.remove("comparison");
                                    elementsCards[i].classList.remove('comparison_cards')
                                }
                                //Если элементы массива сравнения равны то оставляем их видимыми 
                                if (arrayComparison[0] === arrayComparison[1]) {
                                    elementsCards.forEach(e => e.classList.add('cards_visible'))
                                    kol = kol + 2; // переменная для счета пар
                                }
                                //Если элементы массива сравнения не равны то делаем их невидимыми(переварачиваем обратно)
                                if (arrayComparison[0] !== arrayComparison[1]) {
                                    for (let i = 0; i < elements.length; i++) {
                                        elements[i].classList.add("cards_hidden");
                                    }
                                }
                                arrayComparison = []; //Очищаем массив сравнения
                                //Если все карты открыты, то очищаем поле и выводим сообщение о выигрыше и кнопку для начала заново
                                if (kol === (inputValue * inputValue)) {
                                    endMessange(container, form)
                                }
                            }
                        }, 250)
                    })
                }


            }

            setTimeout(() => {
                time(container, form)
            }, 60000);





        })

    });
})();
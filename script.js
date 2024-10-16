const people = [
    { name: "Белов Юра ", birthday: "2006-03-22" },
    { name: "Ахметшин Ильдар", birthday: "2005-08-03" },
    { name: "Бикбаева Иделия", birthday: "2006-11-05" },
    { name: "Гумеров Йасин", birthday: "2006-04-03" },
    { name: "Галимова Дарья", birthday: "2004-08-05" },
    { name: "Данилова Дарья", birthday: "2006-01-17" },
    { name: "Джамаль Эд-Дин Комрад", birthday: "2006-07-26" },
    { name: "Ермолаев Эдуард", birthday: "2006-02-26" },
    { name: "Кузнецова Валерия", birthday: "2006-06-11" },
    { name: "Кулыев Денис", birthday: "2005-03-14" },
    { name: "Мартынова Ульяна", birthday: "2006-03-15" },
    { name: "Минебаев Данил", birthday: "2006-06-28" },
    { name: "Мурашова Ксения", birthday: "2005-12-17" },
    { name: "Назмиев Айзат", birthday: "2006-06-07" },
    { name: "Платонова Полина", birthday: "2006-02-26" },
    { name: "Пятков Тимур", birthday: "2005-12-13" },
    { name: "Рогожина Виктория", birthday: "2006-07-25" },
    { name: "Рюхова Софья", birthday: "2006-02-08" },
    { name: "Садыкова Радмила", birthday: "2006-01-12" },
    { name: "Сафин Мирас", birthday: "2005-08-10" },
    { name: "Сафина Ильдина", birthday: "2006-09-30" },
    { name: "Строй Владислав", birthday: "2005-03-30" },
    { name: "Хузин Ильгиз", birthday: "2006-01-12" },
    { name: "Шигапова Мадина", birthday: "2006-05-01" },
];

function calculateDaysUntilBirthday(birthday) {
    const today = new Date();
    const thisYear = today.getFullYear();
    const nextBirthday = new Date(`${thisYear}-${birthday.slice(5)}`);
    
    // Если день рождения уже прошел в этом году, берём следующий год
    if (nextBirthday < today) {
        nextBirthday.setFullYear(thisYear + 1);
    }
    
    const oneDay = 1000 * 60 * 60 * 24;
    const daysLeft = Math.ceil((nextBirthday - today) / oneDay);
    return daysLeft;
}

function populateBirthdayList(sortedPeople) {
    const listElement = document.getElementById('birthday-list');
    listElement.innerHTML = ''; // Очищаем список
    
    sortedPeople.forEach(person => {
        const daysLeft = calculateDaysUntilBirthday(person.birthday);
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="name">${person.name}</span>
            <span class="days-left">${daysLeft} Дней осталось</span>
        `;
        listElement.appendChild(listItem);
    });
}

// Функция для сортировки по имени
function sortListByName() {
    const sortedPeople = [...people].sort((a, b) => a.name.localeCompare(b.name));
    populateBirthdayList(sortedPeople);
}

// Функция для сортировки по дням до дня рождения
function sortListByDays() {
    const sortedPeople = [...people].sort((a, b) => {
        const daysA = calculateDaysUntilBirthday(a.birthday);
        const daysB = calculateDaysUntilBirthday(b.birthday);
        return daysA - daysB;
    });
    populateBirthdayList(sortedPeople);
}

// Функция для сортировки на основе выбора в выпадающем списке
function sortList() {
    const sortOption = document.getElementById('sort-select').value;
    
    if (sortOption === 'name') {
        sortListByName();
    } else if (sortOption === 'days') {
        sortListByDays();
    }
}

// Заполняем список при загрузке страницы
populateBirthdayList(people);

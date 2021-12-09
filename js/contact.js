class User {
    constructor(data) {
        if (data.name && data.name.length > 0 || data.phone && data.phone.length > 0) this.data = data;
    }

    edit(data) {
        Object.assign(this.data, data);
    }

    get() {
        return this;
    }

}

class Contacts {
    constructor() {
        this.userId = 0;
        this.data = [];
    }

    add(data) {
        let user = new User(data);

        if (user.data) {
            user.data.id = ++this.userId;

            this.data.push(user);

            return true;
        }

        return false;
    }

    edit(id, data) {
        if (!id) return false;

        let user = this.data.find(user =>{
            if (user.data.id == id) return user;
        });
        
        if(!user) return false;

        user.edit(data);

        return true;
    }

    remove(id) {
        if (!id) return false;

        let users = this.data.filter(user => {
            return user.data.id !=id;
        });

        this.data = users;

        return true;
    }

    get() {
        return this.data;
    }
}


class ContactsApp extends Contacts {
    constructor() {
        super();

        this.init();
    }

    onAdd() {
        let name = this.contactName.value;
        let phone = this.contactPhone.value;
        let address = this.contactAddress.value;
        let email = this.contactEmail.value;

        let data = {
            name: name,
            phone: phone,
            address: address,
            email: email
        };

       return this.add(data);
    }

    onRemove(id) {
        if (this.remove(id)) this.update();
    }

    onEdit(id, liName, liPhone, liAddress, liEmail) {
        liName.contentEditable = "true";
        liPhone.contentEditable = "true";
        liAddress.contentEditable = "true";
        liEmail.contentEditable = "true";

        const save = _ => {
            liName.contentEditable = "false";
            liPhone.contentEditable = "false";
            liAddress.contentEditable = "false";
            liEmail.contentEditable = "false";

            let data = {
                name: liName.innerText,
                phone: liPhone.innerText,
                address: liAddress.innerText,
                email: liEmail.innerText
            };

            if (this.edit(id, data)) this.update();
        }

        liName.addEventListener('keyup', event => {
            if (event.key == 'Enter' && event.ctrlKey == true) save();
        });
        
        liPhone.addEventListener('keyup', event => {
            if (event.key == 'Enter' && event.ctrlKey == true) save();
        });
        
        liAddress.addEventListener('keyup', event => {
            if (event.key == 'Enter' && event.ctrlKey == true) save();
        });
        
        liEmail.addEventListener('keyup', event => {
            if (event.key == 'Enter' && event.ctrlKey == true) save();
        });
    }

    update() {
        let data = this.get();

        this.listElem.innerHTML = "";

        data.forEach(note => {
            let contactItem = document.createElement('div');
            contactItem.classList.add('contact_item');

            let contactAvatar = document.createElement('div');
            contactAvatar.classList.add('contact_photo');
            contactAvatar.innerHTML = `<span>${note.data.name[0]}</span>`;

            let btnRemoveElem = document.createElement('div');
            btnRemoveElem.classList.add('btn_contact_remove');

            let contactInfo = document.createElement('div');
            contactInfo.classList.add('contact_info');

            let infoUl = document.createElement('ul');
    
            let liName = document.createElement('li');
            liName.innerHTML = `${note.data.name}`;

            let liPhone = document.createElement('li');
            liPhone.innerHTML = `${note.data.phone}`;

            let liAddress = document.createElement('li');
            liAddress.innerHTML = `${note.data.address}`;

            let liEmail = document.createElement('li');
            liEmail.innerHTML = `${note.data.email}`;

            infoUl.append(liName,liPhone,liAddress,liEmail);

            contactInfo.append(infoUl);

            contactItem.append(contactAvatar, contactInfo);

            contactAvatar.append(btnRemoveElem);

            this.listElem.append(contactItem);

            let arrLi = document.querySelectorAll('ul > li');
            arrLi.forEach(li =>{
                li.addEventListener('dblclick', _ => {
                    this.onEdit(note.data.id, liName,liPhone,liAddress,liEmail);
                });
            });

            btnRemoveElem.addEventListener('click', _ =>{
                this.onRemove(note.data.id);
            });


        });
    }


    init () {
        
        let contactsElem = document.createElement('div');
        contactsElem.classList.add('contacts');

        let headerElem = document.createElement('div');
        headerElem.classList.add('contact_header');

        let h1Elem = document.createElement('h1');
        h1Elem.innerHTML = "Contacts";

        let btn_add = document.createElement('div');
        btn_add.classList.add('btn_add');

        let formElem = document.createElement('div');
        formElem.classList.add('contact_form', 'hidden');
        formElem.innerHTML = ` 
        <form action="#">
            <div class="field">
                <span>Name</span>
                <input type="text" class="name" name="name">
            </div>
            <div class="field">
                <span>Phone</span>
                <input type="tel" class="phone" name="phone">
            </div>
            <div class="field">
                <span>Address</span>
                <input type="text" class="address" name="addres">
            </div>
            <div class="field">
                <span>Email</span>
                <input type="email" class="email" name="email">
            </div>
            <button class="add">add contact</button>
        </form>`;
       
        let listElem = document.createElement('div');
        listElem.classList.add('contact_list');
 
        headerElem.append(h1Elem, btn_add);

        contactsElem.append(headerElem, formElem, listElem);

        document.body.append(contactsElem);

        btn_add.addEventListener('click', function(){
            formElem.classList.toggle('hidden');
        });

       let contactBtnAdd = document.querySelector('.add');
       contactBtnAdd.addEventListener('click', _ => {
           _.preventDefault();
           if (this.onAdd()) this.update();
       });

       this.contactName = document.querySelector('.name');
       this.contactPhone = document.querySelector('.phone');
       this.contactAddress = document.querySelector('.address');
       this.contactEmail = document.querySelector('.email');
       this.listElem = listElem;
    }
}


// let user = new User ({
//     id : 0,
//     name : 'Ivan',
//     address : 'Minsk',
//     email : 'Ivan@gmail.com',
//     phone : 299323601
// });


// let myContacts = new Contacts();

// myContacts.add({
//     name : 'Ivan',
//     address : 'Minsk',
//     email : 'Ivan@gmail.com',
//     phone : 299323601
// });


// myContacts.add({
//     name : 'Yan',
//     address : 'Minsk',
//     email : 'Yan@gmail.com',
//     phone : 321321543
// });

// myContacts.add({
//     name : 'Pasha',
//     address : 'Minsk',
//     email : 'Pasha@gmail.com',
//     phone : 3215643
// });

// console.log(myContacts);

// myContacts.edit(2, {
//     name : 'Vlad',
//     address : 'Minsk',
//     email : 'VLad@gmail.com',
//     phone : 3215643
// });

// console.log(myContacts);

// myContacts.remove(1);

// console.log(myContacts);

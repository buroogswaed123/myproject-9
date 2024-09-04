document.addEventListener('DOMContentLoaded', () => {
    const contactList = document.getElementById('contact-list');
    const searchInput = document.getElementById('search');
    const addContactBtn = document.getElementById('add-contact-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const contactForm = document.getElementById('contact-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const effectBtn = document.getElementById('effect-btn');
    const profilePicInput = document.getElementById('profile-pic');
    const profilePicPreview = document.getElementById('profile-pic-preview');
    const contactCountDisplay = document.getElementById('contact-count');  // Contact count display element

    let contacts = [
        { id: 1, name: 'buroog swaed', phone: '0525822206', address: '123 Elm St', email: 'brwgswd@gmail.com', age:'20', profilePic:'buroog.jpg' },
        { id: 2, name: 'elaf swaed', phone: '076-654-3870', address: '456 Oak St', email: 'elaf@egmaile.com', age: '15', profilePic: 'elaf.jpg' },
        { id: 1, name: 'naser swaed', phone: '055-987-766', address: '123 Elm St', email: 'naser22swd@gmail.com', age:'34', profilePic:'naser.jpg' },
        { id: 2, name: 'nejme khateeb', phone: '096-6543-87', address: '456 Oak St', email: 'nejme123@egmaile.com', age: '25', profilePic: 'nejme.jpg' },
        { id: 1, name: 'arej swaed', phone: '050-764-366', address: '123 Elm St', email: 'arejsswd@gmail.com', age:'30', profilePic:'arej.jpg' },
        { id: 2, name: 'aya jindawe', phone: '087-654-3210', address: '456 Oak St', email: 'ayajin@egmaile.com', age: '22', profilePic: 'aya.jpg' },
        { id: 1, name: 'nadine swaed', phone: '05357-200-06', address: '123 Elm St', email: 'nadine234s@gmail.com', age:'29', profilePic:'nadine.jpg' },
        { id: 2, name: 'retaj sobeh', phone: '07-654-3210', address: '456 Oak St', email: 'retaj123@egmaile.com', age: '35', profilePic: 'retaj.jpg' },
        { id: 1, name: 'rawan habashi', phone: '054-589-2136', address: '123 Elm St', email: 'rawanh12@gmail.com', age:'24', profilePic:'rawan.jpg' },
        { id: 2, name: 'roaia habashi', phone: '017-654-3210', address: '456 Oak St', email: 'r234@egmaile.com', age: '23', profilePic: 'roaia.jpg' },
        // Add more initial records with profile pictures
    ];

    const updateContactCount = () => {
        contactCountDisplay.textContent = `Total Contacts: ${contacts.length}`;
    };

    const renderContacts = () => {
        contactList.innerHTML = '';
        contacts.sort((a, b) => a.name.localeCompare(b.name)).forEach(contact => {
            const contactItem = document.createElement('div');
            contactItem.classList.add('contact-item');
            contactItem.dataset.id = contact.id;
            contactItem.innerHTML = `
                <img src="${contact.profilePic || 'https://via.placeholder.com/100'}" alt="${contact.name}'s Profile Picture">
                <span>${contact.name} - ${contact.phone}</span>
                <button class="update-btn">Update</button>
                <button class="delete-btn">Delete</button>
            `;
            contactList.appendChild(contactItem);
        });
        updateContactCount();  // Update contact count after rendering contacts
    };

    const openPopup = (contact) => {
        document.getElementById('record-id').value = contact.id || '';
        document.getElementById('name').value = contact.name || '';
        document.getElementById('phone').value = contact.phone || '';
        document.getElementById('address').value = contact.address || '';
        document.getElementById('email').value = contact.email || '';
        document.getElementById('notes').value = contact.notes || '';
        profilePicInput.value = '';  // Clear the file input
        profilePicPreview.src = contact.profilePic || '';
        profilePicPreview.style.display = contact.profilePic ? 'block' : 'none';
        popup.classList.remove('hidden');
    };

    const closePopup = () => {
        popup.classList.add('hidden');
    };

    contactList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.parentElement.dataset.id;
            const contact = contacts.find(contact => contact.id == id);
            if (confirm(`Are you sure you want to delete the contact: ${contact.name}?`)) {
                contacts = contacts.filter(contact => contact.id != id);
                renderContacts();
            }
        } else if (e.target.classList.contains('update-btn')) {
            const id = e.target.parentElement.dataset.id;
            const contact = contacts.find(contact => contact.id == id);
            openPopup(contact);
        }
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(query));
        contactList.innerHTML = '';
        filteredContacts.forEach(contact => {
            const contactItem = document.createElement('div');
            contactItem.classList.add('contact-item');
            contactItem.dataset.id = contact.id;
            contactItem.innerHTML = `
                <img src="${contact.profilePic || 'https://via.placeholder.com/100'}" alt="${contact.name}'s Profile Picture">
                <span>${contact.name} - ${contact.phone}</span>
                <button class="update-btn">Update</button>
                <button class="delete-btn">Delete</button>
            `;
            contactList.appendChild(contactItem);
        });
        updateContactCount();  // Update contact count after filtering
    });

    addContactBtn.addEventListener('click', () => {
        openPopup({ id: '', name: '', phone: '', address: '', email: '', notes: '', profilePic: '' });
    });

    deleteAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all contacts? This action cannot be undone.')) {
            contacts = [];
            renderContacts();
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('record-id').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const notes = document.getElementById('notes').value;
        const profilePic = profilePicPreview.src;

        if (!name || !phone) {
            alert('Name and Phone Number are mandatory fields.');
            return;
        }

        const phonePattern = /^[0-9]+$/;
        if (!phonePattern.test(phone)) {
            alert('Phone Number must contain only numbers.');
            return;
        }

        if (contacts.some(contact => contact.name === name && contact.id !== id)) {
            alert('A contact with this name already exists.');
            return;
        }

        if (id) {
            const contact = contacts.find(contact => contact.id == id);
            contact.name = name;
            contact.phone = phone;
            contact.address = address;
            contact.email = email;
            contact.notes = notes;
            contact.profilePic = profilePic;
        } else {
            contacts.push({
                id: Date.now(),
                name: name,
                phone: phone,
                address: address,
                email: email,
                notes: notes,
                profilePic: profilePic
            });
        }

        closePopup();
        renderContacts();
    });

    profilePicInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                profilePicPreview.src = event.target.result;
                profilePicPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            profilePicPreview.src = '';
            profilePicPreview.style.display = 'none';
        }
    });

    cancelBtn.addEventListener('click', closePopup);
    closePopupBtn.addEventListener('click', closePopup);

    effectBtn.addEventListener('click', () => {
        document.body.classList.toggle('effect');
    });

    renderContacts();
});












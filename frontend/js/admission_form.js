async function validateAndSubmitForm() {
    const form = document.getElementById('admissionForm');
    const formData = {
        yourname: form.yourname.value,
        email: form.email.value,
        phone: form.phone.value,
        parentsMobile: form.parentsMobile.value,
        address: form.address.value,
        branch: form.branch.value,
        quota: form.quota.value,
        sslcPercentage: parseFloat(form.sslcPercentage.value),
        pucPercentage: parseFloat(form.pucPercentage.value),
        category: form.category.value,
    };

    try {
        const response = await fetch('http://localhost:5000/api/admission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            form.reset();
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again later.');
    }
}

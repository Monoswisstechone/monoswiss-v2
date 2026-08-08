import { config } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const responseContainer = document.getElementById('form-response');
    const submitButton = document.getElementById('submit-button');
    const turnstileContainer = document.getElementById('turnstile-container');
    let turnstileWidgetId = null;

    if (!form) return;

    // Dynamically load Turnstile script and render widget
    const loadTurnstile = () => {
        if (window.turnstile) {
            renderTurnstile();
        } else {
            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoaded';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }
    };

    window.onTurnstileLoaded = () => {
        renderTurnstile();
    };

    const renderTurnstile = () => {
        if (turnstileContainer && config.TURNSTILE_SITE_KEY && !turnstileWidgetId) {
            turnstileWidgetId = window.turnstile.render(turnstileContainer, {
                sitekey: config.TURNSTILE_SITE_KEY,
                theme: 'auto',
            });
        }
    };

    loadTurnstile();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearAllErrors();
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Include Turnstile response
        const turnstileToken = window.turnstile ? window.turnstile.getResponse(turnstileWidgetId) : null;
        if (!turnstileToken) {
            showResponse('Could not verify you are human. Please refresh and try again.', 'error');
            setLoading(false);
            return;
        }
        data['cf-turnstile-response'] = turnstileToken;

        try {
            const response = await fetch(config.WORKER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                showResponse(result.message || 'Your message has been sent successfully!', 'success');
                form.reset();
                 if (window.turnstile && turnstileWidgetId) {
                    window.turnstile.reset(turnstileWidgetId);
                }
            } else {
                handleErrorResponse(result);
            }
        } catch (error) {
            showResponse('An unexpected network error occurred. Please try again later.', 'error');
        } finally {
            setLoading(false);
        }
    });

    function validateForm() {
        let isValid = true;
        const fields = ['name', 'email', 'message', 'projectType'];
        fields.forEach(id => {
            const input = document.getElementById(id);
            if (!validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    }

    function validateField(input) {
        const id = input.id;
        const value = input.value.trim();
        let errorMessage = '';

        if (input.required && value === '') {
            errorMessage = 'This field is required.';
        } else {
            switch (id) {
                case 'name':
                    if (value.length < 2 || value.length > 100) errorMessage = 'Name must be between 2 and 100 characters.';
                    break;
                case 'email':
                    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    if (!emailRegex.test(value)) errorMessage = 'Please enter a valid email address.';
                    break;
                case 'message':
                    if (value.length < 20 || value.length > 2000) errorMessage = 'Message must be between 20 and 2000 characters.';
                    break;
            }
        }

        if (errorMessage) {
            showError(id, errorMessage);
            return false;
        }
        return true;
    }

    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', () => {
            clearError(input.id);
            validateField(input);
        });
        input.addEventListener('input', () => {
             clearError(input.id);
        });
    });

    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            document.getElementById(fieldId).setAttribute('aria-invalid', 'true');
        }
    }

    function clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            document.getElementById(fieldId).removeAttribute('aria-invalid');
        }
    }

    function clearAllErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
    }

    function showResponse(message, type) {
        responseContainer.className = `form-response ${type}`;
        responseContainer.textContent = message;
        responseContainer.style.display = 'block';
    }

    function setLoading(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.querySelector('.button-text').style.display = 'none';
            submitButton.querySelector('.spinner').style.display = 'inline-block';
        } else {
            submitButton.disabled = false;
            submitButton.querySelector('.button-text').style.display = 'inline-block';
            submitButton.querySelector('.spinner').style.display = 'none';
        }
    }

    function handleErrorResponse(result) {
        if (result.error === 'VALIDATION_ERROR' && result.errors) {
            showResponse('Please correct the errors below and try again.', 'error');
            Object.entries(result.errors).forEach(([field, message]) => {
                showError(field, message);
            });
        } else {
            showResponse(result.message || 'An unknown error occurred.', 'error');
        }
    }
});

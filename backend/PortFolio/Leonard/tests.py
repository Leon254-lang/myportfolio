from django.test import TestCase
from django.urls import reverse

from .models import ContactMessage


class ContactViewTests(TestCase):
    def test_valid_contact_submission_is_saved(self):
        response = self.client.post(
            reverse("contact"),
            {
                "name": "Leonard",
                "email": "leonard@example.com",
                "subject": "Portfolio enquiry",
                "message": "Please get in touch.",
            },
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.content, b"OK")
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_invalid_contact_submission_is_rejected(self):
        response = self.client.post(
            reverse("contact"),
            {
                "name": "Leonard",
                "email": "not-an-email",
                "subject": "Portfolio enquiry",
                "message": "Please get in touch.",
            },
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_contact_endpoint_rejects_get(self):
        response = self.client.get(reverse("contact"))

        self.assertEqual(response.status_code, 405)

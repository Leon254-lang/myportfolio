from django.http import HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from .forms import ContactMessageForm


@csrf_exempt
def contact(request):
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])

    form = ContactMessageForm(request.POST)
    if not form.is_valid():
        errors = "; ".join(
            error for field_errors in form.errors.values() for error in field_errors
        )
        return HttpResponse(errors, status=400, content_type="text/plain")

    form.save()
    return HttpResponse("OK", status=201, content_type="text/plain")

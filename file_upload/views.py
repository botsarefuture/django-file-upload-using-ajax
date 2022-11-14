from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from .models import FileModel
from django.core.files.base import ContentFile
import base64

# Create your views here.
def index(request):
    return render(template_name="index.html", request=request)

def upload_file(request):
    file = request.FILES.get("file")
    f = open(file.name, "wb")
    for chunk in file.chunks():
        f.write(chunk)
    f.close()
    return JsonResponse({"link": "https://google.com"})


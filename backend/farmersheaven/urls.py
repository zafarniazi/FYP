"""farmersheaven URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin




urlpatterns = [
    path('openapi', get_schema_view(
         title="Farmers Heaven API",
         description="Remote Sensing based Smart Web Portal for Crops Yield Estimation",
         version="1.0.0"
         ), name='openapi-schema'),

    path('', TemplateView.as_view(
        template_name='doc.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='api-doc'),

    path('admin/', admin.site.urls),
    path('api/users/', include('account.urls')),
    path('api/healthanalysis/', include('healthanalysis.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/contactus/', include('contactus.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)

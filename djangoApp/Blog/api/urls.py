from rest_framework import routers
from .api import BlogViewSet

router = routers.DefaultRouter()
router.register('api/blog',BlogViewSet, 'blog' )

urlpatterns = router.urls
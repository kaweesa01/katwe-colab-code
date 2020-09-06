from rest_framework import routers
from .api import BlogViewSet,UserBlogViewSet

router = routers.DefaultRouter()
router.register('api/blog',BlogViewSet, 'blog' )
router.register('api/userBlog',UserBlogViewSet, 'UserBlog' )


urlpatterns = router.urls
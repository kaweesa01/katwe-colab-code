from rest_framework import routers
from .api import BlogViewSet,UserBlogViewSet,ImageViewSet
# LogoViewSet

router = routers.DefaultRouter()
router.register('api/blog',BlogViewSet, 'blog' )
router.register('api/userBlog',UserBlogViewSet, 'UserBlog' )
router.register('api/logo',ImageViewSet, 'logo' )


urlpatterns = router.urls
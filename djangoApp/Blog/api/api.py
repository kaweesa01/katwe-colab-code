from Blog.models import BlogModel
from rest_framework import permissions, viewsets
from .serializers import BlogSerializer
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser

# Blog view set

class BlogViewSet(viewsets.ModelViewSet):
    queryset = BlogModel.objects.all().order_by('-date')
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BlogSerializer
    parser_classes = (JSONParser, FormParser, MultiPartParser)
    
    def delete(self, request, format=None):
      BlogModel.image.delete(save=True)
      return Response(status=status.HTTP_204_NO_CONTENT)
  
class UserBlogViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = BlogSerializer
    parser_classes = (JSONParser, FormParser, MultiPartParser)
    
    def delete(self, request, format=None):
      BlogModel.image.delete(save=True)
      return Response(status=status.HTTP_204_NO_CONTENT)
  
    def get_queryset(self):
        return self.request.user.blog.all().order_by('-date')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
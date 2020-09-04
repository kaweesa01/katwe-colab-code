from django.db import models
import os
# Create your models here.

class BlogModel(models.Model):
    image = models.ImageField(upload_to='pictures/%Y/%m/%d/', max_length=255, null=True, blank=True)
    blog = models.TextField()
    date = models.DateTimeField(auto_now=True)
    
    def delete(self,*args,**kwargs):
        if os.path.isfile(self.image.path):
            os.remove(self.image.path)

        super(BlogModel, self).delete(*args,**kwargs)
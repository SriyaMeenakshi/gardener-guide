"""Frozen ImageNet MobileNetV2 as a feature extractor, plus the exact preprocessing used everywhere (train + serve)."""
import numpy as np
import torch
import torchvision
from PIL import Image, ImageOps

from common import IMG_SIZE, MEAN, STD

_mean = torch.tensor(MEAN).view(3, 1, 1)
_std = torch.tensor(STD).view(3, 1, 1)


def load_image_tensor(path_or_image):
    """RGB image -> float tensor (3, 224, 224) in [0, 1].

    Center-crop to a square first (uploaded photos are rarely square; PlantVillage images already are),
    then resize with PIL's anti-aliased bilinear filter. The Node server does the equivalent with sharp.
    """
    img = path_or_image if isinstance(path_or_image, Image.Image) else Image.open(path_or_image)
    img = ImageOps.exif_transpose(img).convert("RGB")  # apply the photo's rotation, as the server does (no-op for PlantVillage)
    w, h = img.size
    side = min(w, h)
    left, top = (w - side) // 2, (h - side) // 2
    img = img.crop((left, top, left + side, top + side)).resize((IMG_SIZE, IMG_SIZE), Image.BILINEAR)
    arr = np.asarray(img, dtype=np.float32) / 255.0
    return torch.from_numpy(arr).permute(2, 0, 1)


def normalise(x):
    return (x - _mean) / _std


def backbone():
    """Pretrained MobileNetV2 up to the 1280-d global-average-pooled feature vector."""
    weights = torchvision.models.MobileNet_V2_Weights.IMAGENET1K_V1
    net = torchvision.models.mobilenet_v2(weights=weights)
    net.classifier = torch.nn.Identity()  # torchvision pools inside forward(), so this yields (N, 1280)
    return net.eval()

"""The small classifier that sits on top of the frozen backbone features."""
import torch
from torch import nn

FEATURE_DIM = 1280


class Head(nn.Module):
    def __init__(self, mean, std, n_classes, hidden=0, dropout=0.2):
        super().__init__()
        # Feature standardisation lives inside the module so exporting the model carries it along.
        self.register_buffer("mean", torch.as_tensor(mean, dtype=torch.float32))
        self.register_buffer("std", torch.as_tensor(std, dtype=torch.float32))
        if hidden:
            layers = [nn.Dropout(dropout), nn.Linear(FEATURE_DIM, hidden), nn.ReLU(), nn.Dropout(dropout), nn.Linear(hidden, n_classes)]
        else:
            layers = [nn.Dropout(dropout), nn.Linear(FEATURE_DIM, n_classes)]
        self.net = nn.Sequential(*layers)

    def forward(self, x):
        return self.net((x - self.mean) / self.std)

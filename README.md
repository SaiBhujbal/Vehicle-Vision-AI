# Vehicle-Vision-AI

## Overview

This project focuses on enhancing real-time aerial vehicle detection under occlusion using advanced deep learning techniques and multi-stage computer vision processing. The system aims to improve robustness and accuracy in detecting and classifying vehicles (cars, buses, trucks, and vans) across multiple aerial datasets, particularly in environments where occlusions, varying viewpoints, and complex backgrounds pose challenges.

## Problem Statement

Detecting vehicles in aerial imagery is a challenging task due to occlusions, varying viewpoints, and the presence of complex urban environments. Traditional object detection models often struggle in these scenarios, leading to inaccurate or missed detections. This project seeks to address these challenges by leveraging occlusion-aware detection models, specifically for detecting vehicles in UAV-based aerial imagery from the **VisDrone** and **UAVDT** datasets.

## Datasets

This project utilizes two primary datasets for vehicle detection:

1. **VisDrone (38GB)**
   - A large-scale dataset captured in urban and suburban environments for vehicle detection.
   - Targets include vehicles such as cars, buses, trucks, and vans.
   - Contains 10,209 images with annotated bounding boxes and object categories.
   - The dataset provides a challenging real-world setting with varying levels of occlusion, weather conditions, and complex urban backgrounds.

2. **UAVDT (15GB)**
   - Focuses on vehicle detection and tracking in UAV-based urban environments.
   - Contains 80 video sequences with 23,258 frames, annotated for vehicle detection.
   - Features include varying levels of occlusion, weather conditions, and complex urban environments, making it a valuable dataset for testing vehicle detection performance under challenging conditions.

## Methodology

The project integrates an **Occlusion Estimation Module (OEM)** to generate occlusion masks that improve detection performance in challenging conditions. The methodology includes the following steps:

### Data Preprocessing
- Loading vehicle-related images from the **VisDrone** and **UAVDT** datasets and parsing vehicle annotations (cars, trucks, buses, vans).
- Mapping images to corresponding occlusion information based on visibility scores.

### Occlusion Mask Generation
- Extracting bounding boxes and visibility scores for vehicles.
- Converting relative coordinates to absolute pixel values for precise bounding box placement.
- Generating occlusion masks using intensity scaling based on visibility metrics to highlight occluded vehicle areas.

### Model Integration
- Enhancing YOLO-based vehicle detection models (YOLO v8x, YOLO v11x) with occlusion-aware input processing.
- Using transformer-based post-processing to refine vehicle detections in areas affected by occlusion.

### Evaluation and Optimization
- Comparing vehicle detection performance with and without occlusion-aware enhancements.
- Optimizing the system using quantitative performance metrics, particularly focusing on the accuracy of vehicle detection under occlusion.

## Implementation

The system processes vehicle-related images and annotations to create occlusion-aware data inputs:
- The **VisDrone** and **UAVDT** datasets are loaded, and vehicle-related annotations are parsed from text files.
- Vehicle bounding boxes are extracted, converted into pixel coordinates, and clamped within image dimensions.
- A binary occlusion mask is generated for each image, highlighting occluded vehicle regions based on visibility metrics.
- The occlusion masks are stored and visualized to assess the effectiveness of the occlusion estimation.
- The final processed dataset is used for training enhanced YOLO-based vehicle detection models.

## Progress

- ✅ **Occlusion Estimation Module** implemented for the **VisDrone** and **UAVDT** datasets, focusing on vehicles.
- ✅ **YOLO v8x and YOLO v11x** trained on the **VisDrone** dataset for vehicle detection.
- 🚀 **Ongoing work** on transformer-based detection refinement for improved vehicle identification under occlusion.

## Outputs

- **VisDrone - YOLO v8x - Vehicle Detection:**
![Screenshot 2025-03-24 141225](https://github.com/user-attachments/assets/e4fa971e-be47-4f8d-a23f-02479ee02b70)

- **VisDrone - YOLO v11x - Vehicle Detection:**
![Screenshot 2025-03-24 141550](https://github.com/user-attachments/assets/ff5b83d6-c59e-41de-9ae5-b07ad49714c8)

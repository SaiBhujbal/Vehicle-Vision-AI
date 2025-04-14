# Vehicle-Vision-AI

## Overview

This project focuses on enhancing real-time aerial vehicle detection under occlusion using advanced deep learning techniques and multi-stage computer vision processing. The system aims to improve robustness and accuracy in detecting and classifying vehicles (cars, buses, trucks, and vans) across multiple aerial datasets, particularly in environments where occlusions, varying viewpoints, and complex backgrounds pose challenges.

<p align="center">
  <img src="./assets/web.gif" alt="Website" width="1000">
</p>

## Problem Statement

Detecting vehicles in aerial imagery is a challenging task due to occlusions, varying viewpoints, and the presence of complex urban environments. Traditional object detection models often struggle in these scenarios, leading to inaccurate or missed detections. This project seeks to address these challenges by leveraging occlusion-aware detection models, specifically for detecting vehicles in UAV-based aerial imagery from the *VisDrone* and *UAVDT* datasets.

## Datasets

This project utilizes two primary datasets for vehicle detection:

1. *VisDrone (38GB)*
   - A large-scale dataset captured in urban and suburban environments for vehicle detection.
   - Targets include vehicles such as cars, buses, trucks, and vans.
   - Contains 10,209 images with annotated bounding boxes and object categories.
   - The dataset provides a challenging real-world setting with varying levels of occlusion, weather conditions, and complex urban backgrounds.

2. *UAVDT (15GB)*
   - Focuses on vehicle detection and tracking in UAV-based urban environments.
   - Contains 80 video sequences with 23,258 frames, annotated for vehicle detection.
   - Features include varying levels of occlusion, weather conditions, and complex urban environments, making it a valuable dataset for testing vehicle detection performance under challenging conditions.

## Methodology

The project integrates an *Occlusion Estimation Module (OEM)* to generate occlusion masks that improve detection performance in challenging conditions. The methodology includes the following steps:

### Data Preprocessing
- Loading vehicle-related images from the *VisDrone* and *UAVDT* datasets and parsing vehicle annotations (cars, trucks, buses, vans).
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
- The *VisDrone* and *UAVDT* datasets are loaded, and vehicle-related annotations are parsed from text files.
- Vehicle bounding boxes are extracted, converted into pixel coordinates, and clamped within image dimensions.
- A binary occlusion mask is generated for each image, highlighting occluded vehicle regions based on visibility metrics.
- The occlusion masks are stored and visualized to assess the effectiveness of the occlusion estimation.
- The final processed dataset is used for training enhanced YOLO-based vehicle detection models.

## Progress

- ✅ *Occlusion Estimation Module* implemented for the *VisDrone* and *UAVDT* datasets, focusing on vehicles.
- ✅ *YOLO v8x and YOLO v11x* trained on the *VisDrone* dataset for vehicle detection.
- 🚀 *Ongoing work* on transformer-based detection refinement for improved vehicle identification under occlusion.

## Outputs

- *VisDrone - YOLO v8x - Vehicle Detection:*
![Screenshot 2025-03-24 141225](https://github.com/user-attachments/assets/e4fa971e-be47-4f8d-a23f-02479ee02b70)

- *VisDrone - YOLO v11x - Vehicle Detection:*
![Screenshot 2025-03-24 141550](https://github.com/user-attachments/assets/ff5b83d6-c59e-41de-9ae5-b07ad49714c8)

## Model Demo
<p align="center">
  <img src="./assets/demo.gif" alt="Demo" width="800" height="450">
</p>

## How to Run:
Below is a simplified, step-by-step guide to help you download, set up and deploy the Vehicle-Vision-AI project (with its detection and tracking features) on your own domain in a production environment.

---

### 1. Clone the Repository and Install Dependencies

#### a. Clone the GitHub Repository
Open your terminal and run:

bash
git clone https://github.com/saharshmehrotra/Vehicle-Vision-AI.git


Then, change into the project folder:

bash
cd Vehicle-Vision-AI


#### b. Install Node.js Dependencies
The project uses Next.js for its frontend. Make sure you have Node.js installed (preferably the latest LTS version). Then, install dependencies using either npm or pnpm:

bash
npm install


Note: If you prefer pnpm and the project includes a pnpm-lock.yaml, you can run pnpm install instead.

#### c. (Optional) Set Up Python Environment for ML Features
If the detection and tracking logic runs via Python scripts or Jupyter notebooks, set up a Python 3 environment. Install packages such as Ultralytics (for YOLO), OpenCV, etc.:

bash
pip install ultralytics opencv-python


This step ensures you have all the libraries needed for running the vehicle detection and tracking models.

---

### 2. Test the Project Locally

#### a. Run the Next.js Development Server
To see the project in action locally, start the development server:

bash
npm run dev


Now open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the site.

#### b. Try Out Detection and Tracking
- User Interface: Look for buttons or upload options that allow you to feed an image or video into the app.
- Notebooks: If no direct demo is available in the UI, check the provided Jupyter notebooks (e.g., in the YOLO Testing folder) to run example detection/tracking tests.

When the detection and tracking features are confirmed working locally, you’re ready for production deployment.

---

### 3. Prepare for Production Deployment

#### a. Build the Application
For production, first build your Next.js app:

bash
npm run build


Once the build is complete, start the production server with:

bash
npm start


This command runs the built application, typically on port 3000.

#### b. Environment Variables and Configurations
- Create a .env file (if needed) for production settings.
- Ensure that any paths for model weights or API keys are set correctly.

---

### 4. Deploying on a Cloud Server with a Custom Domain

#### a. Set Up a Server (e.g., AWS EC2 or DigitalOcean)
1. Provision a VM: Choose an Ubuntu server or similar.
2. SSH into your server:  
   bash
   ssh -i /path/to/your-key.pem ubuntu@YOUR_SERVER_IP
   

#### b. Install Required Software on the Server
1. Update and Install Node.js, Git, and Nginx:

   bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y nodejs npm git nginx
   

2. Install PM2:
   
   PM2 is a process manager that will ensure your app keeps running.
   
   bash
   sudo npm install -g pm2
   

#### c. Clone and Build the Project on the Server
1. Clone the repository:
   
   bash
   git clone https://github.com/saharshmehrotra/Vehicle-Vision-AI.git
   cd Vehicle-Vision-AI
   npm install
   npm run build
   

2. Start the App with PM2:
   
   bash
   pm2 start npm --name "vehicle-vision-ai" -- start
   pm2 save
   pm2 startup
   

This will run your application on port 3000 in the background.

#### d. Set Up Your Domain and HTTPS with Nginx

1. Point Your Domain to Your Server:
   - In your domain registrar’s DNS settings, add an A record pointing your domain (e.g., myvehicleapp.com) to your server’s public IP.
  
2. Configure Nginx as a Reverse Proxy:
   - Create a new configuration file:

     bash
     sudo nano /etc/nginx/sites-available/vehicle-vision-ai.conf
     

   - Paste the following content (replace myvehicleapp.com with your domain):

     nginx
     server {
         listen 80;
         server_name myvehicleapp.com www.myvehicleapp.com;

         location / {
             proxy_pass http://localhost:3000;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection 'upgrade';
             proxy_set_header Host $host;
             proxy_cache_bypass $http_upgrade;
         }
     }
     

   - Save the file and enable the config:

     bash
     sudo ln -s /etc/nginx/sites-available/vehicle-vision-ai.conf /etc/nginx/sites-enabled/
     sudo nginx -t
     sudo systemctl restart nginx
     

3. Enable HTTPS with Let’s Encrypt:
   - Install Certbot for Nginx:

     bash
     sudo apt install -y certbot python3-certbot-nginx
     

   - Run Certbot to obtain and configure your SSL certificate:

     bash
     sudo certbot --nginx -d myvehicleapp.com -d www.myvehicleapp.com
     

   Follow the prompts to complete installation. Once finished, your site should be accessible via HTTPS at [https://myvehicleapp.com](https://myvehicleapp.com).

---

### 5. Final Production Best Practices

- Process Management:  
  PM2 ensures your app stays running and restarts on server reboots. Review PM2 logs if issues arise.

- Security:  
  Use a firewall (e.g., UFW) to close all unnecessary ports. Allow only HTTP/HTTPS (ports 80 and 443) and SSH (port 22).

- Performance:  
  Monitor CPU/memory usage especially if your detection/tracking uses heavy ML models. If needed, consider GPU-based instances or a lighter model version.

- Regular Updates:  
  Keep your system and dependencies updated. Let’s Encrypt certificates renew automatically, but verify they update as needed.

---

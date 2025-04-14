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

---

### 1. Clone the Repository and Install Dependencies

#### a. Clone the GitHub Repository

Open your terminal and run:

```bash
git clone https://github.com/saharshmehrotra/Vehicle-Vision-AI.git
cd Vehicle-Vision-AI
```

#### b. Install Node.js Dependencies

Ensure you have the latest LTS version of **Node.js** installed. Then install the frontend dependencies:

```bash
npm install
```

> 💡 If the project includes a `pnpm-lock.yaml` file and you prefer `pnpm`, you can run:
```bash
pnpm install
```

#### c. (Optional) Set Up Python Environment for ML Features

If the project includes Python scripts or Jupyter notebooks for detection/tracking:

1. Ensure Python 3 is installed.
2. Create a virtual environment (optional but recommended).
3. Install the required packages:

```bash
pip install ultralytics opencv-python
```

---

### 2. Test the Project Locally

#### a. Run the Next.js Development Server

To start the development server:

```bash
npm run dev
```

Open your browser and visit: [http://localhost:3000](http://localhost:3000)

#### b. Try Out Detection and Tracking Features

- Use the web interface to upload images or videos.
- Alternatively, check the `YOLO Testing` folder for Python notebooks to manually test detection and tracking.

---

### 3. Prepare for Production Deployment

#### a. Build the Application

For a production build:

```bash
npm run build
npm start
```

> By default, the app runs on port **3000**.

#### b. Configure Environment Variables (if needed)

- Create a `.env` file.
- Add necessary API keys or model paths.

---

### 4. Deploy on a Cloud Server with a Custom Domain

#### a. Set Up a Cloud Server

Provision a VM (e.g., AWS EC2, DigitalOcean) with Ubuntu. Then SSH into it:

```bash
ssh -i /path/to/your-key.pem ubuntu@YOUR_SERVER_IP
```

#### b. Install Required Software

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm git nginx
sudo npm install -g pm2
```

#### c. Clone and Build the Project on the Server

```bash
git clone https://github.com/saharshmehrotra/Vehicle-Vision-AI.git
cd Vehicle-Vision-AI
npm install
npm run build
```

Start the app with PM2:

```bash
pm2 start npm --name "vehicle-vision-ai" -- start
pm2 save
pm2 startup
```

#### d. Configure Nginx and Set Up a Domain

##### 1. Point Your Domain

Add an **A record** in your domain registrar’s DNS, pointing `myvehicleapp.com` to your server's public IP.

##### 2. Set Up Nginx Reverse Proxy

Create a config file:

```bash
sudo nano /etc/nginx/sites-available/vehicle-vision-ai.conf
```

Paste the following (replace `myvehicleapp.com`):

```nginx
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
```

Enable the config:

```bash
sudo ln -s /etc/nginx/sites-available/vehicle-vision-ai.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

##### 3. Secure with HTTPS (Let’s Encrypt)

Install Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Run the SSL setup:

```bash
sudo certbot --nginx -d myvehicleapp.com -d www.myvehicleapp.com
```

Visit [https://myvehicleapp.com](https://myvehicleapp.com) to confirm HTTPS is active.

---

### 5. Final Production Best Practices

- **Process Management**  
  PM2 keeps your app running and restarts it after reboots. Use `pm2 logs` to debug.

- **Security**  
  Use `ufw` to allow only necessary ports (e.g., 22, 80, 443):

  ```bash
  sudo ufw allow OpenSSH
  sudo ufw allow 'Nginx Full'
  sudo ufw enable
  ```

- **Performance Monitoring**  
  Watch CPU/memory usage. Consider using lighter models or GPU instances for better performance.

- **Regular Maintenance**  
  Keep system packages, Node.js, and dependencies up to date. Certbot will auto-renew SSL, but verify periodically:

  ```bash
  sudo certbot renew --dry-run
  ```

---


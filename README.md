# CS3219 Group 3 PeerPrep Setup Guide

## Overview
This is a microservice project that is hosted on GCP using Google Kubernetes Engine.

## Using the app
Please use Google chrome to test this app. Before you start testing this app, **plase make the following temporary changes to Chrome**. This is to ensure that Chrome is allowed to use the camera and audio on your laptop even though the website is using a HTTP Protocol.

- Copy and paste `chrome://flags/#unsafely-treat-insecure-origin-as-secure` into your Chrome URL, and press Enter
- In the section labeled 'Insecure origins treated as secure', paste `http://34.93.229.197` inside the textbox. Ensure that the dropdown on the right is currently `Enabled`
- A popup should appear on the bottom right of Chrome to ask you to relaunch Chrome in order to apply the changes. Kindly do that.

After doing the above procedures, kindly access the web app through the link http://34.93.229.197/.

## Setting up Kubernetes Cluster locally
As we are unable to share our GCP key, we will provide the steps for you to setup this same kubernetes cluster on your local machine. This steps can be replicated with any kubernetes cluster that you are currently connected to (including minikube, aws, gke, etc.)

1. Ensure that you have kubectl installed on your command line
2. Do check which cluster your kubectl is currently connected to. If there is no cluster, you cab first connect to a minikube cluster and continue with the following steps.
3. Clone this repository using `git clone https://github.com/CS3219-SE-Principles-and-Patterns/cs3219-project-ay2122-2122-s1-g3.git`
4. Navigate to the backend directory using `cd cs3219-project-ay2122-2122-s1-g3/backend`
5. Run `kubectl apply -f compiler-deployment.yml`
6. Run `kubectl apply -f compiler-service.yml`
7. Run `kubectl apply -f editor-configure-map.yml`
8. Run `kubectl apply -f editor-redis-deployment.yml`
9. Run `kubectl apply -f editor-redis-service.yml`
10. Run `kubectl apply -f editor-deployment.yml`
11. Run `kubectl apply -f editor-service.yml`
12. Run `kubectl apply -f frontend-configure-map.yml`
13. Run `kubectl apply -f frontend-deployment.yml`
14. Run `kubectl apply -f frontend-service.yml`
15. Run `kubectl apply -f matchmaking-deployment.yml`
16. Run `kubectl apply -f matchmaking-service.yml`
17. Run `kubectl apply -f user-management-configmap.yml`
18. Run `kubectl apply -f user-management-secret.yml`
19. Run `kubectl apply -f user-management-redis-deployment.yml`
20. Run `kubectl apply -f user-management-redis-service.yml`
21. Run `kubectl apply -f user-management-deployment.yml`
22. Run `kubectl apply -f user-management-service.yml`
23. Run `kubectl apply -f video-configure-map.yml`
24. Run `kubectl apply -f video-redis-deployment.yml`
25. Run `kubectl apply -f video-redis-service.yml`
26. Run `kubectl apply -f video-deployment.yml`
27. Run `kubectl apply -f video-service.yml`


After all the deployments are setup, run `kubectl get svc`, and get the External IP of the frontend service. It should be accessible and should lead to the web app
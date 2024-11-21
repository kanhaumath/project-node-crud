# project-node-crud
Application is UP on http://107.23.253.31:3000/api/main

Prometheus is UP on http://107.23.253.31:9090

AlertManager is UP on http://107.23.253.31:9093

Clone the Repository on your local system make sure to install all the dependencies like node, mongo, docker, docker-compose, prometheus, alertmanager
after cloning the Repository 
run Command 
docker-compose up -d --build ( the application will start running on your local server )
## The application will now up on your local system
## I have Created the EKS Cluster With Terraform. This is the Repository https://github.com/kanhaumath/eks-terraform.git
## After Cloning the above Repository Run Following Commands":
 terraform init
 terraform plan
 terraform apply
It will take around 10-15 min. to create EKS cluster
Connect Eks Cluster to your local system after installing aws cli and kubectl utility
to connect to EKS Cluster
"aws eks update-kubeconfig --name cluster_name --region region_name"
## Install Helm  :-  curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
Run command  helm create node-backend 
Make the necessary changes
upgrade the Helm chart
helm upgrade --install backend-app ./backend-app --namespace default
Verify Deployment
kubectl get pods
![image](https://github.com/user-attachments/assets/4086e335-d34e-457e-ac75-08e8bcf5d2a4)

kubectl get svc
![image](https://github.com/user-attachments/assets/e1a8d19c-947f-49ad-baac-1b28e6703262)







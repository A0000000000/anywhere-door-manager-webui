# anywhere-door-manager-webui
* 基于React为AnywhereDoorManager开发的WebUI

## 打包方式
1. 将代码仓库clone到本地
2. 安装docker及buildx
3. 打包镜像:
    * `docker buildx build --platform linux/amd64 -t 192.168.25.5:31100/maoyanluo/anywhere-door-manager-webui:1.0 . --load`

## 部署方式
### Docker Command Line
1. 创建容器:
    * `docker run --name anywhere-door-manager-webui -itd -p 8090:80 -e HOST=后台管理ip -e PORT=后台管理端口 --restart=always 192.168.25.5:31100/maoyanluo/anywhere-door-manager-webui:1.0`

### Kubernetes
```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: anywhere-door-manager-webui-deployment
  namespace: anywhere-door
spec:
  replicas: 1
  selector:
    matchLabels:
      app: anywhere-door-manager-webui
  template:
    metadata:
      labels:
        app: anywhere-door-manager-webui
    spec:
      containers:
      - name: anywhere-door-manager-webui
        image: 192.168.25.5:31100/maoyanluo/anywhere-door-manager-webui:1.0
        imagePullPolicy: IfNotPresent
        env:
        - name: HOST
          value: "anywhere-door-manager-service.anywhere-door"
        - name: PORT
          value: "80"
        ports:
        - containerPort: 80
      restartPolicy: Always
---
apiVersion: v1
kind: Service
metadata:
  name: anywhere-door-manager-webui-service
  namespace: anywhere-door
  labels:
    app: anywhere-door-manager-webui
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 80
      nodePort: 20080
  selector:
    app: anywhere-door-manager-webui
```
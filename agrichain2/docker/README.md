docker build -t agtrace .

docker run -d -p 3000:3000 --name ruralnet agtrace

bx login

bx target --cf

bx cs init

bx cs cluster-config 

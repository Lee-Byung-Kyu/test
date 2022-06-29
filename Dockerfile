FROM debian:buster

RUN apt-get update
RUN apt-get upgrade -y

CMD ["/bin/bash"]

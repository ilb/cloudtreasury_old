echo -n "you are running $0 type yes to continue: "
read -r answer
[ "$answer" != "yes" ] && exit

zcat data.sql.gz | sudo -u postgres psql dictionaries


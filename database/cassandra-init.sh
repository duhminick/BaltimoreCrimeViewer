cat >/init.cql << EOF
CREATE KEYSPACE IF NOT EXISTS bcv WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE bcv;
CREATE TABLE IF NOT EXISTS crimes(
    id int,
    crimedate date,
    crimehour int,
    crimeminute int,
    crimecode text,
    location text,
    secondarylocation text,
    description text,
    inside Boolean,
    weapon text,
    post text,
    district text,
    neighborhood text,
    longitude double,
    latitude double,
    premise text,
    PRIMARY KEY (id)
);
EOF

until cqlsh -f /init.cql; do
    echo "cqlsh: cassandra is not yet available - retrying"
    sleep 2
done &

exec /docker-entrypoint.sh "$@"
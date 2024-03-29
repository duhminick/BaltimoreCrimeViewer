import abc

class Normalization(abc.ABC):
    @abc.abstractmethod
    def normalize(self, data):
        pass 

class InsideOutside(Normalization):
    def normalize(self, data):
        if 'inside_outside' in data:
            data['inside'] = data['inside_outside'] == 'I'
            del data['inside_outside']

class CrimeTime(Normalization):
    def normalize(self, data):
        if 'crimetime' in data:
            hour, minute, _ = data['crimetime'].split(':')
            data['crimehour'] = int(hour)
            data['crimeminute'] = int(minute)
            del data['crimetime']

class TotalIncidents(Normalization):
    def normalize(self, data):
        if 'total_incidents' in data:
            del data['total_incidents']

class VRIName(Normalization):
    def normalize(self, data):
        if 'vri_name1' in data:
            del data['vri_name1']

def normalize(data):
    tasks = []
    tasks.append(InsideOutside())
    tasks.append(CrimeTime())
    tasks.append(TotalIncidents())
    tasks.append(VRIName())

    for task in tasks:
        task.normalize(data)

    return data
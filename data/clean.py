import csv

rawpath = 'raw_incidents.csv'
output = 'clean_incidents.csv'

class Incident:
	def __init__(self, date, time, report_no, agency, age, UI_affiliation, location, charge):
		self.date = date
		self.time = time
		self.report_no = report_no
		self.agency = agency
		self.age = age
		self.UI_affiliation = UI_affiliation
		self.location = location
		self.charge = charge

all_incidents = []

with open(rawpath, 'r+') as rawfile:
	reader = csv.reader(rawfile)
	for row in reader:
		date = row[0]
		if date[2] is '6':
			date = '2015-03-06'
		elif date[2] is '7':
			date = '2015-03-07'

		time = row[1]
		if len(time) == 4:
			time = time[:2] + ":" + time[2:]
		elif len(time) == 2:
			time = "00:" + time
		else:
			time = "00:0" + time

		report_no = row[2]
		agency = row[3]
		age = int(row[4])

		UI_affiliation = row[5]
		if UI_affiliation == 'UI':
			UI_affiliation = 1
		else:
			UI_affiliation = 0

		location = row[6]
		charge = row[7]

		entry = Incident(date, time, report_no, agency, age, UI_affiliation, location, charge)
		all_incidents.append(entry)
		
with open(output, 'w+') as writeFile:
	fieldnames = ['date_occurred', 'time_occurred', 'report_number', 'agency', 'age', 'UI_affiliation', 'arrest_location', 'charge']
	writer = csv.DictWriter(writeFile, fieldnames=fieldnames)
	
	writer.writeheader()

	for incident in all_incidents:
		writer.writerow({'date_occurred' : incident.date, 'time_occurred' : incident.time, 'report_number' : incident.report_no, 'agency' : incident.agency, 'age' : incident.age, 'UI_affiliation' : incident.UI_affiliation, 'arrest_location' : incident.location, 'charge' : incident.charge})





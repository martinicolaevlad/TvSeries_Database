from faker import Faker
import os

if __name__ == '__main__':
    fake = Faker()

    batch_size = 1000
    with open('tv_series.sql', 'w') as file:
        sql = "TRUNCATE TABLE tv_series_actor RESTART IDENTITY CASCADE;\n" \
              "TRUNCATE TABLE tv_series_director RESTART IDENTITY CASCADE;\n" \
              "TRUNCATE TABLE tv_series_payment RESTART IDENTITY CASCADE;\n" \
              "TRUNCATE TABLE tv_series_tvserie RESTART IDENTITY CASCADE;\n"

        # ALTER TABLE employee_register_employeeproject DROP CONSTRAINT employee_register_em_project_id>
        # ALTER TABLE employee_register_employeeproject DROP CONSTRAINT employee_register_em_employee_i>
        # DROP INDEX employee_register_employeeproject_employee_id_36bf3f97;\n \
        # DROP INDEX employee_register_employeeproject_project_id_9af26355;\n"

        file.write(sql + "\n")
        for i in range(0, 100, 1):
            directors = []
            for j in range(i, i+1):
                name = fake.name()
                residence = fake.address()
                phone_number = fake.phone_number()
                age = fake.random_int(min=18, max=80)
                email = fake.email()
                directors.append(f"('{name}', '{age}','{residence}', '{phone_number}', '{email}')")
            data = f"INSERT INTO tv_series_director (name, age, residence, phone_number, email) VALUES {','.join(directors)};"
            file.write(data + "\n")

        print("Directors added")
        file.write("SELECT 'directors done!' as msg;\n")

        for i in range(0, 100, 1):
            actors = []
            for j in range(i, i+1):
                name = fake.name()
                nr_awards = fake.random_int(min=0, max=60)
                phone_number = fake.phone_number()
                age = fake.random_int(min=18, max=80)
                email = fake.email()
                actors.append(f"('{name}', '{age}','{nr_awards}', '{phone_number}', '{email}')")
            data = f"INSERT INTO tv_series_actor (name, age, nr_awards, phone_number, email) VALUES {','.join(actors)};"
            file.write(data + "\n")

        print("Actors added")
        file.write("SELECT 'actors done!' as msg;\n")

        for i in range(0, 100, 1):
            tv_series = []
            for j in range(i, i+1):
                title = fake.name()
                director_id = fake.random_int(min=1, max=100)
                year_published = fake.random_int(min=1960, max=2023)
                nr_seasons = fake.random_int(min=0, max=25)
                castt = fake.name()
                rating = fake.pyfloat(left_digits=1, right_digits=2, positive=True, min_value=1, max_value=10)
                tv_series.append(f"('{title}', '{year_published}', '{nr_seasons}', '{castt}', '{rating}', '{director_id}')")
            data = f"INSERT INTO tv_series_tvserie(title, year_published, nr_seasons, \"cast\", rating, director_id) VALUES {','.join(tv_series)};"
            file.write(data + "\n")
        print("Tv_series added")
        file.write("SELECT 'tv_series done!' as msg;\n")

        for i in range(100):
            if i % 10 == 0:
                print(f'{i * 10} done')

            actor_id = fake.random_int(min=1, max=100)
            payments = []
            for j in range(10):
                tv_serie_id = fake.random_int(min=1, max= 100)
                days_worked = fake.random_int(min=50, max=1000)
                salary = fake.random_int(min=0, max=10000) 
                payments.append(f"('{salary}', '{days_worked}','{tv_serie_id}','{actor_id}')")
            data = f"INSERT INTO tv_series_payment (salary, days_worked, tv_serie_id, actor_id) VALUES {','.join(payments)};"
            file.write(data + "\n")
        print("Payments added")

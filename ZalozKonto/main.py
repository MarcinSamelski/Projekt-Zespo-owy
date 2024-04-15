import json
import random
import string

def generuj_nr_rachunku():
    return ''.join(random.choices(string.digits, k=26))

def zaloz_konto():
    imie = input("Podaj imię: ")
    nazwisko = input("Podaj nazwisko: ")
    pesel = input("Podaj PESEL: ")
    login = input("Podaj login: ")
    haslo = input("Podaj hasło: ")

    # Generowanie nr rachunku
    nr_rachunku = generuj_nr_rachunku()

    # Zapis danych klienta
    nowe_konto = {
        'imie': imie,
        'nazwisko': nazwisko,
        'pesel': pesel,
        'login': login,
        'haslo': haslo,
        'nr_rachunku': nr_rachunku,
        'stan_konta': 0,
        'nazwa_konta': 'konto'
    }

    with open('dane.txt', 'a') as file:
        json.dump(nowe_konto, file)
        file.write('\n')

    print("Konto zostało założone.")

if __name__ == "__main__":
    zaloz_konto()

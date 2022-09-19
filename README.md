Данный репозиторий содержит CLI утилиту **Вычислитель отличий**, предназначенную для сравнения и вывода различий двух конфигурационных файлов.
CLI-утилита принимает через командную строку два аргумента — пути до этих сравниваемых файлов.

## Формат конфигурационных файлов:

`JSON`
`YML`
`YAML`

## Результат сравнения файлов может выводиться форматах:

`- stylish`
`- plain`
`- json`

# Установка:

1. Установите Node.js последней версии.
2. Склонируйте репозиторий себе на машину.
3. Выполните установку зависимостей `make install`.
4. Справку можно запустить командой: `gendiff -h`

## Hexlet tests and linter status:

[![Actions Status](https://github.com/Starodubtcev/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Starodubtcev/frontend-project-lvl2/actions)

## My test:

[![Node CI](https://github.com/Starodubtcev/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Starodubtcev/frontend-project-lvl2/actions/workflows/nodejs.yml)

## Code climate:

<a href="https://codeclimate.com/github/Starodubtcev/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/ebd5b4f66a820ce8da9e/maintainability" /></a>

## Test-coverage:

<a href="https://codeclimate.com/github/Starodubtcev/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/ebd5b4f66a820ce8da9e/test_coverage" /></a>

# Примеры работы CLI утилиты:

## Пример работы с линейными файлами `.json` и вывод в формате `stylish`

<a href="https://asciinema.org/a/2A4VfczuQVRXJNF0qXI2Do2zw" target="_blank"><img src="https://asciinema.org/a/2A4VfczuQVRXJNF0qXI2Do2zw.svg" /></a>

## Пример работы с линейными файлами `.yml`и `.yaml` и вывод в формате `stylish`

<a href="https://asciinema.org/a/iU9jCM9TPbUU2ZuPOQTIvTTZN" target="_blank"><img src="https://asciinema.org/a/iU9jCM9TPbUU2ZuPOQTIvTTZN.svg" /></a>

## Пример работы с вложенными файлами `.json`, `.yml`и `.yaml` и вывод в формате `stylish`

<a href="https://asciinema.org/a/CDxtbrFwD51oVu3Snd5gxhhbE" target="_blank"><img src="https://asciinema.org/a/CDxtbrFwD51oVu3Snd5gxhhbE.svg" /></a>

## Пример работы с вложенными файлами `.json` и вывод в формате `plain`

<a href="https://asciinema.org/a/dBqWtV0iA7CJnPvkkxtDMJPU3" target="_blank"><img src="https://asciinema.org/a/dBqWtV0iA7CJnPvkkxtDMJPU3.svg" /></a>

## Пример работы с вложенными файлами `.json` и вывод в формате `JSON`

<a href="https://asciinema.org/a/FuxWLEYYfOMDkJrnOKYtCxOQM" target="_blank"><img src="https://asciinema.org/a/FuxWLEYYfOMDkJrnOKYtCxOQM.svg" /></a>

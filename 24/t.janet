(def init [0 0 0])

(defn e [coord]
  (let
    ([x y z] coord)
    [(+ x 1) (- y 1) z]))

(defn w [coord]
  (let
    ([x y z] coord)
    [(- x 1) (+ y 1) z]))

(defn ne [coord]
  (let
    ([x y z] coord)
    [(+ x 1) y (- z 1)]))


(defn nw [coord]
  (let
    ([x y z] coord)
    [x (+ y 1) (- z 1)]))

(defn se [coord]
  (let
    ([x y z] coord)
    [x (- y 1) (+ z 1)]))

(defn sw [coord]
  (let
    ([x y z] coord)
    [(- x 1) y (+ z 1)]))

(def tiles @{})

(def move
  '{
    :main (* (some :moves) -1)
    :moves (capture (+ "e" "w" "ne" "nw" "se" "sw"))
    })

(def fs
  @{
    "e" e
    "w" w
    "se" se
    "sw" sw
    "ne" ne
    "nw" nw})

(def input (string/split "\n" (string/trim(slurp "input.txt"))))

(defn flip [coord]
  (if (nil? (tiles coord))
    (put tiles coord 1)
    (put tiles coord nil)
    ))


(defn go (line)
    (->>
      (peg/match move line)
      (reduce (fn [coord m] ((fs m) coord)) [0 0 0])
      (pp)
      ))

(go "esenee")
(go "esew")

(go "nwwswee")

(map
  (fn [line]
    (->>
      (peg/match move line)
      (reduce (fn [coord m] ((fs m) coord)) [0 0 0])
      (flip)
      (pp)
      ))
  input)

(pp (length tiles))

(pp tiles)

(pp input)

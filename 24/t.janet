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

(def tiles @{})

(defn flip [coord]
  (if (nil? (tiles coord))
    (put tiles coord 1)
    (put tiles coord nil)
    ))


(defn go (line)
    (->>
      (peg/match move line)
      (reduce (fn [coord m] ((fs m) coord)) init)
      ))

# (go "esenee")
# (go "esew")
#
# (go "nwwswee")

(defn p1 [args]
  (do
    (def input (string/split "\n" (string/trim (slurp (get args 1)))))
    (map
      (fn [line]
        (->>
          (peg/match move line)
          (reduce (fn [coord m] ((fs m) coord)) init)
          (flip)
          ))
      input)
    (pp (length tiles))
    )
  )

(defn neighbor [coord]
  (map |($ coord) (values fs))
  )

(defn neighbor-1s [coord]
  (->>
    (map |(tiles $) (neighbors coord))
    (filter |(not (nil? $)))
    (length)
    )
  )

(defn main [& args]
  (p1 args)
  )

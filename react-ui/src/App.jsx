import { useState } from "react";
import "./App.css";

const SIZE = 8;

// Φτιάχνει έναν κενό πίνακα 8x8
function createEmptyBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
}

// Αρχικοποίηση σαν την ChessBoard.theseis() στη Java
function initialBoard() {
  const b = createEmptyBoard();

  // Άσπροι πύργοι και αξιωματικοί
  b[0][0] = "wR"; // white Rook
  b[0][7] = "wR";
  b[0][2] = "wB"; // white Bishop
  b[0][5] = "wB";

  // Μαύροι πύργοι και αξιωματικοί
  b[7][0] = "bR"; // black Rook
  b[7][7] = "bR";
  b[7][2] = "bB"; // black Bishop
  b[7][5] = "bB";

  return b;
}

const PIECE_ICONS = {
  wR: "♖",
  bR: "♜",
  wB: "♗",
  bB: "♝",
};

function App() {
  // state της σκακιέρας
  const [board] = useState(initialBoard());

  // state για το επιλεγμένο τετράγωνο / κομμάτι
  const [selectedCell, setSelectedCell] = useState(null);

  // τι γίνεται όταν κάνω κλικ σε ένα τετράγωνο (r,c)
  function handleSquareClick(r, c) {
    const piece = board[r][c];

    if (piece == null) {
      // αν είναι άδειο τετράγωνο, καθάρισε την επιλογή
      setSelectedCell(null);
    } else {
      // αν υπάρχει κομμάτι, αποθήκευσέ το ως επιλεγμένο
      setSelectedCell({
        row: r,
        col: c,
        piece: piece,
      });
    }
  }

  return (
    <div className="app">
      <h1>ChessPiece – Rook & Bishop Demo</h1>

      <div className="board">
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isDark = (r + c) % 2 === 1; // εναλλαγή σκούρο/ανοιχτό τετράγωνο

            return (
              <div
                key={`${r}-${c}`}
                className={`square ${isDark ? "dark" : "light"}`}
                onClick={() => handleSquareClick(r, c)}
              >
                {cell ? PIECE_ICONS[cell] : ""}
              </div>
            );
          })
        )}
      </div>

      <div className="info">
        {selectedCell ? (
          <p>
            Selected piece: <strong>{selectedCell.piece}</strong>{" "}
            at (row {selectedCell.row}, col {selectedCell.col})
          </p>
        ) : (
          <p>No piece selected.</p>
        )}
      </div>
    </div>
  );
}

export default App;

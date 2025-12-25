public class ChessBoard {

    public static final int SIZE = 8;

    private ChessPiece[][] cBoard; // δισδιάστατος πίνακας ChessPiece για να μπορώ να χρησιμοποιήσω τα
                                   // χαρακτηριστικά των κλάσεων και υποκλάσεων όπως validDestination
                                   // χρώμα(Ασπρο ή Μαύρο) θέση(γραμμή ή στήλη) πως κινείται ο ROOK και ο BISHOP
                                   // (κίνηση ευθεία η διαγώνια) και όνομα πίνακα cBoard. Συνεπώς το ChessPiece το
                                   // χρησιμοποιώ για να πάρω αντικείμενα απο την κλάσση στον δισδιάστο πίνακα
                                   // cBoard

    public ChessBoard() {
        cBoard = new ChessPiece[SIZE][SIZE]; // αρχικοποίηση 8χ8 με null
    }

    public void theseis() { // Τοποθετώ τα πιόνια μονο στις παρακάτω θέσεις
        // Άσπρος πύργος στις γωνίες επάνω
        cBoard[0][0] = new ChessRook('w', 0, 0);
        cBoard[0][7] = new ChessRook('w', 0, 7);

        // Άσπροι αξιωματικοί δίπλα στη βασίλισσα και τον βασιλιά
        cBoard[0][2] = new ChessBishop('w', 0, 2);
        cBoard[0][5] = new ChessBishop('w', 0, 5);

        // Μαύροι πύργοι κάτω γωνίες
        cBoard[7][0] = new ChessRook('b', 7, 0);
        cBoard[7][7] = new ChessRook('b', 7, 7);

        // Μαύροι αξιωματικοί
        cBoard[7][2] = new ChessBishop('b', 7, 2);
        cBoard[7][5] = new ChessBishop('b', 7, 5);
    }

    public ChessPiece getPiece(int row, int column) { // Χρησιμοποιώ το ChessPiece για να πάρω μεθόδους, μεταβλητές κτλ απο την κλάση ChessPiece
                                                      // Λαμβάνει συντεταγμένες που δίνω και μου λέει τι υπάρχει στην
                                                      // συγκεκριμένη θέση πιόνι ή η θέση είναι κενή
        return cBoard[row][column];
    }

    public void printBoard() { // Διατρέχω όλο τον πίνακα και με βάση τις συντεταγμένες που έδωσα ελέγχει αν το cBoard[r][c] είναι null ή όχι
        for (int r = 0; r < SIZE; r++) {
            for (int c = 0; c < SIZE; c++) {

                if (cBoard[r][c] == null) {
                    System.out.println(" adeia thesi (" + r + "," + c + ") ");
                } else {
                    System.out.print(" thesi(" + r + "," + c + ") " + cBoard[r][c] + " ");
                }
            }
        }

        System.out.println();
    }
}

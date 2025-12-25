public class ChessApp {

    public static void main(String[] args) {

        ChessBoard board = new ChessBoard();

        board.theseis();

        board.printBoard();

        board.toString();

        // Δημιουργώ έναν λευκό πύργο και θέλω να ξεκινήσει απο την θέση 0γραμμή 0στήλη
        ChessRook cR = new ChessRook('w', 0, 0);
        cR.validDestination(0, 1); // Δηλώνω στις παραμέτρους πού θέλω να κινηθεί ο πύργος

        ChessBishop cB = new ChessBishop('b', 2, 2);
        cB.validDestination(3, 5);

    }
}
